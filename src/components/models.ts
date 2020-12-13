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
  links: {
    avatar: {
      href: string;
    };
  };
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
    self: {
      href: string;
    };
    html: {
      href: string;
    };
    statuses: {
      href: string;
    };
  };
  statuses: BitbucketList<BitbucketBuildStatus> | null;
}
