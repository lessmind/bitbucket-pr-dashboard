import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export const bitbucket = axios.create({
  baseURL: 'https://api.bitbucket.org/2.0/'
});

export const login = (username: string, password: string) => {
  bitbucket.defaults.auth = {
    username,
    password
  };
};

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = bitbucket;
});
