import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {
  title(state: AppStateInterface, payload: '') {
    state.title = payload
  }
};

export default mutation;
