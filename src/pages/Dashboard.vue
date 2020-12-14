<template>
  <q-page class="items-start justify-start q-pa-md">
    <q-ajax-bar position="top" color="secondary" size="2px" skip-hijack />
    <div class="row items-center">
      <div class="q-pa-sm">
        <span class="q-pr-sm text-weight-medium">Project:</span>
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
        <q-btn-dropdown
          color="secondary"
          no-caps
          icon="sort"
          :label="sortAsc ? 'Oldest first' : 'Newest first'"
        >
          <q-list>
            <q-item clickable v-close-popup @click="sortAsc = true">
              <q-item-section>
                <q-item-label>Oldest first</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="sortAsc = false">
              <q-item-section>
                <q-item-label>Newest first</q-item-label>
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
      <div class="q-pa-sm">
        <q-input
          v-model.number="intervalSecs"
          label="Reload after seconds"
          type="number"
          style="max-width: 200px"
        />
      </div>
      <span class="q-pr-sm text-weight-medium"
        >Reload in {{ reloadAfter }}</span
      >
      <q-btn color="warning" @click="timeToReload = new Date()"
        >Reload now</q-btn
      >
    </div>

    <q-list v-for="repo of selectedRepos" :key="repo">
      <q-item-label class="text-h6">{{ repo }}</q-item-label>

      <template v-for="pr of pullRequests[repo]">
        <q-separator spaced :key="`sp-${pr.id}`" />
        <q-item :key="`item-${pr.id}`">
          <q-item-section top class="col justify-center">
            <q-btn-dropdown
              size="sm"
              style="width: 100px"
              :loading="loading"
              :color="titleStateColor(pr.title)"
              :label="titleStateName(pr.title)"
            >
              <q-list>
                <q-item
                  v-for="state of states"
                  :key="state.name"
                  clickable
                  v-close-popup
                  @click="switchState(state.name, pr, repo)"
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
              <q-chip>
                <q-avatar>
                  <img :src="pr.author.links.avatar.href" />
                </q-avatar>
                {{ pr.author.display_name }}
              </q-chip>
              <q-avatar
                size="30px"
                v-for="participant of pr.participants"
                :key="participant.user.uuid"
              >
                <img :src="participant.user.links.avatar.href" />
                <q-badge
                  v-if="participant.approved"
                  floating
                  color="green"
                  style="width: 13px; height: 13px; padding: 3px"
                >
                  <q-icon name="check" size="5px" />
                </q-badge>
              </q-avatar>
            </q-item-label>
            <q-item-label lines="1">
              <q-badge
                :color="countBuild(pr, 'SUCCESSFUL') ? 'positive' : 'grey'"
                text-color="white"
                class="q-mr-xs"
              >
                {{ countBuild(pr, 'SUCCESSFUL') }}
                <q-icon name="check_circle" size="20px" class="q-ml-xs" />
              </q-badge>
              <q-badge
                :color="countBuild(pr, 'INPROGRESS') ? 'primary' : 'grey'"
                text-color="white"
                class="q-mr-xs"
              >
                {{ countBuild(pr, 'INPROGRESS') }}
                <q-icon name="change_circle" size="20px" class="q-ml-xs" />
              </q-badge>
              <q-badge
                :color="countBuild(pr, 'FAILED') ? 'negative' : 'grey'"
                text-color="white"
                class="q-mr-xs"
              >
                {{ countBuild(pr, 'FAILED') }}
                <q-icon name="cancel" size="20px" class="q-ml-xs" />
              </q-badge>
              <q-badge
                :color="pr.comment_count ? 'cyan' : 'grey'"
                text-color="white"
                class="q-mr-xs"
              >
                {{ pr.comment_count }} comments
                <q-icon name="message" size="20px" class="q-ml-xs" />
              </q-badge>
              <q-badge
                :color="pr.task_count ? 'teal' : 'grey'"
                text-color="white"
                class="q-mr-xs"
              >
                {{ pr.task_count }} tasks
                <q-icon name="check_box" size="20px" class="q-ml-xs" />
              </q-badge>
              <span class="text-grey-8">
                Last updated: {{ pastRelativeDateTime(pr.updated_on) }}
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
  loading!: boolean;
  sortAsc!: boolean;
  intervalSecs!: number;
  timeToReload!: Date;
  now!: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interval!: any;

  data() {
    return {
      workspace: this.$route.params.workspace,
      selectedRepos: [],
      loading: false,
      sortAsc: false,
      intervalSecs: 300,
      timeToReload: new Date(Date.now() + 300000),
      now: new Date(),
      interval: null
    };
  }

  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  countBuild(pr: BitbucketPullRequest, state: string) {
    if (!pr.statuses || pr.statuses.values.length === 0) {
      return 0;
    }
    return pr.statuses.values.filter(s => s.state === state).length;
  }

  async switchState(state: string, pr: BitbucketPullRequest, repo: string) {
    const newTitle =
      state === 'READY'
        ? this.trimTitle(pr.title)
        : `[${state}]${this.trimTitle(pr.title)}`;
    if (newTitle === pr.title) {
      return;
    }
    this.loading = true;
    try {
      await this.$store.dispatch('bitbucket/setPullRequestTitle', {
        pullRequest: pr,
        title: newTitle
      });
      await this.$store.dispatch('bitbucket/updateRepositoryPullRequests', {
        repository: repo,
        workspace: this.currentWorkspace
      });
    } catch (e) {
      this.$q.notify('Update pull request state failed');
    }
    this.loading = false;
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
    const match = /^\[(\w+)\]\s*(.*)/.exec(title);
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

  @Watch('intervalSecs')
  onIntervalSecsChanged(val: number) {
    this.timeToReload = new Date(Date.now() + val * 1000);
  }

  @Watch('selectedRepos')
  async onSelectedReposChanged(val: string[], oldVal: string[]) {
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

  pastRelativeDateTime(str: string) {
    const d = new Date(str);
    const days = date.getDateDiff(new Date(), d, 'days');
    const hours = date.getDateDiff(new Date(), d, 'hours');
    const minutes = date.getDateDiff(new Date(), d, 'minutes');
    const seconds = date.getDateDiff(new Date(), d, 'seconds');
    let relative = 'just now';
    if (days) {
      relative = `${days} day(s) ago`;
    } else if (hours) {
      relative = `${hours} hour(s) ago`;
    } else if (minutes) {
      relative = `${minutes} minute(s) ago`;
    } else if (seconds) {
      relative = `${seconds} seconds(s) ago`;
    }
    return relative;
  }

  get reloadAfter() {
    const days = date.getDateDiff(this.timeToReload, this.now, 'days');
    const hours = date.getDateDiff(this.timeToReload, this.now, 'hours');
    const minutes = date.getDateDiff(this.timeToReload, this.now, 'minutes');
    const seconds = date.getDateDiff(this.timeToReload, this.now, 'seconds');
    let relative = 'now';
    if (days) {
      relative = `${days} day(s)`;
    } else if (hours) {
      relative = `${hours} hour(s)`;
    } else if (minutes) {
      relative = `${minutes} minute(s)`;
    } else if (seconds) {
      relative = `${seconds} second(s)`;
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
        return this.sortAsc
          ? ad.getTime() - bd.getTime()
          : bd.getTime() - ad.getTime();
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
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (Date.now() >= this.timeToReload.getTime()) {
        this.timeToReload = new Date(Date.now() + this.intervalSecs * 1000);
        void this.$store.dispatch('bitbucket/updateShowRepositories', {
          workspace: this.currentWorkspace,
          oldRepositories: [],
          newRepositories: this.selectedRepos
        });
      }
      this.now = new Date();
    }, 1000);
  }
}
</script>
