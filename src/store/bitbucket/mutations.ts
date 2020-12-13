import { MutationTree } from 'vuex';
import {
  BitbucketStateInterface,
  BitbucketCredential,
  BITBUCKET_CRED,
  BitbucketList,
  BitbucketWorkspace,
  BitbucketRepository,
  BitbucketPullRequest,
  BitbucketBuildStatus
} from './state';
import { login } from 'src/boot/axios';

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
    state.pullRequests[repository] = pullRequestList;
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
    state.pullRequests[repository][pullRequest.id].statuses = statusList;
  }
};

export default mutation;
