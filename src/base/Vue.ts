import { Store } from 'vuex';
import { StateInterface } from 'src/store';
import { Vue as BaseVue } from 'vue-property-decorator';

export default abstract class Vue extends BaseVue {
  public $store!: Store<StateInterface>;
}
