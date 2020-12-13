export const BITBUCKET_CRED = 'bitbucket.credential';

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
}

const state: BitbucketStateInterface = {
  credential: {
    username: '',
    password: ''
  },
  isLogin: false,
  workspaces: null,
  repositories: null,
  pullRequests: {}
};

export default state;
