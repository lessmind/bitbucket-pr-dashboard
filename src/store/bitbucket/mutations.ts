import { MutationTree } from 'vuex';
import { BitbucketStateInterface, BitbucketCredential, BITBUCKET_CRED } from './state';

const mutation: MutationTree<BitbucketStateInterface> = {
  login (state: BitbucketStateInterface, payload: BitbucketCredential) {
    state.credential = payload
    localStorage.setItem(BITBUCKET_CRED, JSON.stringify(payload));
    state.isLogin = true
  },
  logout(state: BitbucketStateInterface) {
    state.isLogin = false
    localStorage.removeItem(BITBUCKET_CRED)
  }
};

export default mutation;
