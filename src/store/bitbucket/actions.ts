import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { BitbucketStateInterface } from './state';
import {
  BitbucketList,
  BitbucketWorkspace,
  BitbucketRepository,
  BitbucketPullRequest,
  BitbucketBuildStatus
} from 'src/components/models';
import { bitbucket } from 'src/boot/axios';

const actions: ActionTree<BitbucketStateInterface, StateInterface> = {
  async loadWorkspaces(context) {
    const {
      data
    }: { data: BitbucketList<BitbucketWorkspace> } = await bitbucket.get(
      'workspaces'
    );
    context.commit('workspaces', data);
  },
  async loadRepositories(context, workspace: BitbucketRepository) {
    const {
      data
    }: { data: BitbucketList<BitbucketRepository> } = await bitbucket.get(
      `repositories/${workspace.slug}?role=member&pagelen=50`
    );
    context.commit('repositories', data);
  },
  async updateBuildStatus(
    context,
    {
      repository,
      pullRequest
    }: {
      workspace: BitbucketWorkspace;
      repository: string;
      pullRequest: BitbucketPullRequest;
    }
  ) {
    const {
      data
    }: { data: BitbucketList<BitbucketBuildStatus> } = await bitbucket.get(
      `${pullRequest.links.statuses.href}?pagelen=50`
    );
    context.commit('buildStatuses', {
      repository: repository,
      pullRequest,
      statusList: data
    });
  },
  updateBuildStatuses(
    context,
    {
      repository
    }: {
      workspace: BitbucketWorkspace;
      repository: string;
    }
  ) {
    if (!context.state.pullRequests[repository]) {
      return;
    }
    for (const id in context.state.pullRequests[repository]) {
      void context.dispatch('updateBuildStatus', {
        repository,
        pullRequest: context.state.pullRequests[repository][id]
      });
    }
  },
  async loadPullRequests(
    context,
    {
      workspace,
      repository
    }: {
      workspace: BitbucketWorkspace;
      repository: string;
    }
  ) {
    const {
      data
    }: { data: BitbucketList<BitbucketPullRequest> } = await bitbucket.get(
      `repositories/${workspace.slug}/${repository}/pullrequests?state=OPEN&pagelen=50`
    );
    const result: {
      [key: string]: BitbucketPullRequest;
    } = {};
    for (const pr of data.values) {
      result[pr.id] = pr;
    }
    context.commit('pullRequests', {
      repository: repository,
      pullRequestList: result
    });
  },
  async updateRepositoryPullRequests(
    context,
    {
      workspace,
      repository
    }: {
      workspace: BitbucketWorkspace;
      repository: string;
    }
  ) {
    await context.dispatch('loadPullRequests', {
      workspace,
      repository: repository
    });
    await context.dispatch('updateBuildStatuses', { repository });
  },
  async setPullRequestTitle(
    context,
    {
      title,
      pullRequest
    }: {
      title: string;
      pullRequest: BitbucketPullRequest;
    }
  ) {
    await bitbucket.put(pullRequest.links.self.href, { title });
  },
  async updateShowRepositories(
    context,
    {
      workspace,
      oldRepositories,
      newRepositories
    }: {
      workspace: BitbucketWorkspace;
      oldRepositories: string[];
      newRepositories: string[];
    }
  ) {
    newRepositories = newRepositories || [];
    oldRepositories = oldRepositories || [];
    const addRepositories = newRepositories.filter(
      r => !oldRepositories.includes(r)
    );
    for (const slug of addRepositories) {
      await context.dispatch('loadPullRequests', {
        workspace,
        repository: slug
      });
    }
    for (const slug of addRepositories) {
      await context.dispatch('updateBuildStatuses', { repository: slug });
    }
  }
};

export default actions;
