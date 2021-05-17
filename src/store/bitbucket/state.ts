export const BITBUCKET_CRED = 'bitbucket.credential';
export const BITBUCKET_SELECTED_REPOSITORIES =
  'bitbucket.selected_repositories';

import {
  BitbucketCredential,
  BitbucketList,
  BitbucketWorkspace,
  BitbucketRepository,
  BitbucketPullRequest
} from 'src/components/models';

export interface BitbucketStateInterface {
  credential: BitbucketCredential;
  isLogin: boolean;
  workspaces: BitbucketList<BitbucketWorkspace> | null;
  repositories: BitbucketList<BitbucketRepository> | null;
  pullRequests: {
    [key: string]: {
      [key: string]: BitbucketPullRequest;
    };
  };
  selectedRepositories: {
    [key: string]: string[];
  };
}

const state: BitbucketStateInterface = {
  credential: {
    username: '',
    password: ''
  },
  isLogin: false,
  workspaces: null,
  repositories: null,
  pullRequests: {},
  selectedRepositories: {}
};

export default state;
