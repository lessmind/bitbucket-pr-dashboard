import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { BitbucketStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const BitbucketModule: Module<BitbucketStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default BitbucketModule;
