<template>
  <q-page class="items-start justify-start q-pa-md">
    <q-ajax-bar position="top" color="secondary" size="2px" skip-hijack />
    <div class="row items-center">
      <div class="q-pa-sm">
        <span class="q-pr-md text-weight-medium">Project:</span>
        <q-btn-dropdown
          color="primary"
          no-caps
          icon="list"
          :label="currentWorkspace.name"
        >
          <q-list>
            <q-item
              v-for="project of projects"
              :key="project.slug"
              clickable
              v-close-popup
              @click="switchProject(project.slug)"
            >
              <q-item-section>
                <q-item-label>{{ project.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="q-pa-sm">
        <q-select
          clearable
          label="Repositories"
          v-model="selectedRepos"
          multiple
          :options="repos"
          style="min-width: 250px;"
        />
      </div>
    </div>

    <q-list v-for="repo of selectedRepos" :key="repo">
      <q-item-label class="text-h6">{{ repo }}</q-item-label>

      <template v-for="pr of pullRequests[repo]">
        <q-separator spaced :key="`sp-${pr.id}`" />
        <q-item :key="`item-${pr.id}`">
          <q-item-section top class="col">
            <q-btn-dropdown
              size="sm"
              style="width: 100px"
              :color="titleStateColor(pr.title)"
              :label="titleStateName(pr.title)"
            >
              <q-list>
                <q-item
                  v-for="state of states"
                  :key="state.name"
                  clickable
                  v-close-popup
                  @click="switchState(state.name, pr)"
                >
                  <q-item-section>
                    <q-item-label>{{ state.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-item-section>

          <q-item-section top class="col-11">
            <q-item-label lines="1">
              <a
                class="q-mr-sm text-body2 text-weight-bold text-primary cursor-pointer"
                :href="pr.links.html.href"
                target="_blank"
                >{{ trimTitle(pr.title) }}</a
              >
              <span class="text-grey-8">by {{ pr.author.display_name }}</span>
            </q-item-label>
            <q-item-label lines="1">
              <q-icon
                :name="buildIconName(pr)"
                :color="buildIconColor(pr)"
                size="20px"
              >
                <q-tooltip>{{ buildSummary(pr) }}</q-tooltip>
              </q-icon>
              <span class="text-grey-8">
                Last updated: {{ relativeDateTime(pr.updated_on) }}
                <q-tooltip>{{ fullDateTime(pr.updated_on) }}</q-tooltip>
              </span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import Vue from 'src/base/Vue';
import {
  BitbucketPullRequest,
  BitbucketWorkspace
} from 'src/components/models';
import { date } from 'quasar';

@Component({})
export default class PageDashboard extends Vue {
  workspace!: string;
  selectedRepos: string[] = [];
  states: {
    [key: string]: {
      name: string;
      color: string;
    };
  } = {
    WIP: {
      name: 'WIP',
      color: 'warning'
    },
    READY: {
      name: 'READY',
      color: 'positive'
    },
    REVIEWING: {
      name: 'REVIEWING',
      color: 'info'
    }
  };

  data() {
    return {
      workspace: this.$route.params.workspace,
      selectedRepos: []
    };
  }

  buildIconName(pr: BitbucketPullRequest) {
    if (
      !pr.statuses ||
      pr.statuses.values.length === 0 ||
      pr.statuses.values.filter(s => s.state === 'INPROGRESS').length
    ) {
      return 'change_circle';
    }
    if (pr.statuses.values.filter(s => s.state === 'SUCCESSFUL').length) {
      return 'check_circle';
    }
    return 'cancel';
  }

  buildIconColor(pr: BitbucketPullRequest) {
    if (
      !pr.statuses ||
      pr.statuses.values.length === 0 ||
      pr.statuses.values.filter(s => s.state === 'INPROGRESS').length
    ) {
      return 'primary';
    }
    if (pr.statuses.values.filter(s => s.state === 'SUCCESSFUL').length) {
      return 'positive';
    }
    return 'negative';
  }

  buildSummary(pr: BitbucketPullRequest) {
    if (!pr.statuses || pr.statuses.values.length === 0) {
      return '0 builds';
    }
    const total = pr.statuses.values.length;
    const building = pr.statuses.values.filter(s => s.state === 'INPROGRESS')
      .length;
    const success = pr.statuses.values.filter(s => s.state === 'SUCCESSFUL')
      .length;
    const fail = pr.statuses.values.filter(s => s.state === 'FAILED').length;
    return `Successful(${success}) Building(${building}) Failed(${fail}) in total of ${total} builds`;
  }

  switchState(state: string, pr: BitbucketPullRequest) {
    console.log(state, pr);
  }

  titleState(title: string) {
    const match = /^\[(\w+)\].*/.exec(title);
    return match
      ? this.states[match[1]] || this.states.READY
      : this.states.READY;
  }

  titleStateName(title: string) {
    return this.titleState(title).name;
  }

  titleStateColor(title: string) {
    return this.titleState(title).color;
  }

  trimTitle(title: string) {
    const match = /^\[(\w+)\](.*)/.exec(title);
    return match ? (this.states[match[1]] ? match[2] : title) : title;
  }

  switchProject(slug: string) {
    void this.$router.push({
      path: `/dashboard/${slug}`
    });
  }

  @Watch('currentWorkspace')
  async onCurrentWorkspaceChanged(val: BitbucketWorkspace) {
    this.$store.commit('app/title', val.name);
    await this.$store.dispatch(
      'bitbucket/loadRepositories',
      this.currentWorkspace
    );
  }

  @Watch('selectedRepos')
  async onSelectedReposChanged(val: string[], oldVal: string[]) {
    console.log('selectedRepos', val, oldVal);
    await this.$store.dispatch('bitbucket/updateShowRepositories', {
      workspace: this.currentWorkspace,
      oldRepositories: oldVal,
      newRepositories: val
    });
  }

  fullDateTime(str: string) {
    const d = new Date(str);
    return date.formatDate(d, 'Do, MMM YYYY (ddd) HH:mm:ss');
  }

  relativeDateTime(str: string) {
    const d = new Date(str);
    const days = date.getDateDiff(new Date(), d, 'days');
    const hours = date.getDateDiff(new Date(), d, 'hours');
    const minutes = date.getDateDiff(new Date(), d, 'minutes');
    let relative = 'just now';
    if (days) {
      relative = `${days} day(s) ago`;
    } else if (days) {
      relative = `${hours} hour(s) ago`;
    } else if (minutes) {
      relative = `${minutes} minute(s) ago`;
    }
    return relative;
  }

  get repos() {
    if (this.$store.state.bitbucket.repositories === null) {
      return [];
    }
    return this.$store.state.bitbucket.repositories.values.map(r => r.slug);
  }

  get pullRequests() {
    const result: { [key: string]: BitbucketPullRequest[] } = {};
    for (const repo of this.selectedRepos) {
      const prs = Object.values(
        this.$store.state.bitbucket.pullRequests[repo] || []
      );
      prs.sort((a, b) => {
        const ad = new Date(a.updated_on);
        const bd = new Date(b.updated_on);
        return bd.getTime() - ad.getTime();
      });
      result[repo] = prs;
    }
    return result;
  }

  get currentWorkspace() {
    if (this.$store.state.bitbucket.workspaces === null) {
      return { name: '', slug: '' };
    }
    return (
      this.$store.state.bitbucket.workspaces.values.find(
        v => v.slug === this.$route.params.workspace
      ) || this.$store.state.bitbucket.workspaces.values[0]
    );
  }

  get projects() {
    return this.$store.state.bitbucket.workspaces?.values || [];
  }

  async mounted() {
    if (this.$store.state.bitbucket.workspaces === null) {
      await this.$store.dispatch('bitbucket/loadWorkspaces');
    }
    if (!this.currentWorkspace.slug) {
      this.$q.notify('Unable to load workspaces');
      this.$store.commit('bitbucket/logout');
      void this.$router.push({
        path: '/'
      });
      return;
    }
    if (!this.$route.params.workspace) {
      void this.$router.push({
        path: `/dashboard/${this.currentWorkspace.slug}`
      });
    }
  }
}
</script>
