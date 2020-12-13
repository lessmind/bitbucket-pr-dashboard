export const BITBUCKET_CRED = 'bitbucket.credential';

export interface BitbucketCredential {
  username: '';
  password: '';
}

export interface BitbucketList<T> {
  page: number;
  pagelen: number;
  size: number;
  values: Array<T>;
}

export interface BitbucketWorkspace {
  name: string;
  slug: string;
}

export interface BitbucketRepository {
  name: string;
  slug: string;
}
export interface BitbucketBuildStatus {
  key: string;
  description: string;
  url: string;
  state: string;
  name: string;
}

export interface BitbucketUser {
  display_name: string;
  uuid: string;
  nickname: string;
  account_id: string;
}

export interface BitbucketPullRequest {
  id: number;
  author: BitbucketUser;
  title: string;
  destination: {
    branch: {
      name: string;
    };
  };
  source: {
    branch: {
      name: string;
    };
  };
  comment_count: number;
  created_on: string;
  updated_on: string;
  links: {
    html: {
      href: string;
    };
    statuses: {
      href: string;
    };
  };
  statuses: BitbucketList<BitbucketBuildStatus> | null;
}

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
