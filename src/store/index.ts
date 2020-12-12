import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import bitbucket from './bitbucket';
import app from './app';
import { BitbucketStateInterface } from './bitbucket/state';
import { AppStateInterface } from './app/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  bitbucket: BitbucketStateInterface;
  app: AppStateInterface;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      bitbucket,
      app,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
