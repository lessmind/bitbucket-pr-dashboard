export const BITBUCKET_CRED = 'bitbucket.credential';

export interface BitbucketCredential {
  username: '';
  password: '';
}

export interface BitbucketStateInterface {
  credential: BitbucketCredential;
  isLogin: boolean
}

const storedCred = localStorage.getItem(BITBUCKET_CRED);

const state: BitbucketStateInterface = {
  credential: storedCred ? <BitbucketCredential>JSON.parse(storedCred) : {
    username: '',
    password: ''
  },
  isLogin: !!storedCred
};

export default state;
