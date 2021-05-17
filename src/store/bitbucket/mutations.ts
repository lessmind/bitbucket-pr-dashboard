import { MutationTree } from 'vuex';
import {
  BitbucketStateInterface,
  BITBUCKET_CRED,
  BITBUCKET_SELECTED_REPOSITORIES
} from './state';
import {
  BitbucketCredential,
  BitbucketList,
  BitbucketWorkspace,
  BitbucketRepository,
  BitbucketPullRequest,
  BitbucketBuildStatus
} from 'src/components/models';
import { login } from 'src/boot/axios';
import Vue from 'vue';

const mutation: MutationTree<BitbucketStateInterface> = {
  login(state: BitbucketStateInterface, payload: BitbucketCredential) {
    state.credential = payload;
    localStorage.setItem(BITBUCKET_CRED, JSON.stringify(payload));
    login(payload.username, payload.password);
    state.isLogin = true;
  },
  logout(state: BitbucketStateInterface) {
    state.isLogin = false;
    localStorage.removeItem(BITBUCKET_CRED);
  },
  workspaces(
    state: BitbucketStateInterface,
    payload: BitbucketList<BitbucketWorkspace> | null
  ) {
    state.workspaces = Object.freeze(payload);
  },
  repositories(
    state: BitbucketStateInterface,
    payload: BitbucketList<BitbucketRepository> | null
  ) {
    state.repositories = Object.freeze(payload);
  },
  selectedRepositories(
    state: BitbucketStateInterface,
    payload: {
      [key: string]: string[];
    }
  ) {
    state.selectedRepositories = payload;
  },
  selectWorkspaceRepositories(
    state: BitbucketStateInterface,
    payload: {
      repositories: string[];
      workspace: string;
    }
  ) {
    state.selectedRepositories[payload.workspace] = payload.repositories;
    localStorage.setItem(
      BITBUCKET_SELECTED_REPOSITORIES,
      JSON.stringify(state.selectedRepositories)
    );
  },
  pullRequests(
    state: BitbucketStateInterface,
    {
      repository,
      pullRequestList
    }: {
      repository: string;
      pullRequestList: {
        [key: string]: BitbucketPullRequest;
      };
    }
  ) {
    Vue.set(state.pullRequests, repository, pullRequestList);
  },
  buildStatuses(
    state: BitbucketStateInterface,
    {
      repository,
      pullRequest,
      statusList
    }: {
      repository: string;
      pullRequest: BitbucketPullRequest;
      statusList: BitbucketList<BitbucketBuildStatus>;
    }
  ) {
    Vue.set(
      state.pullRequests[repository][pullRequest.id],
      'statuses',
      statusList
    );
  }
};

export default mutation;
