<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input
          v-model="credential.username"
          label="Username"
          :rules="[val => !!val || 'Username is required']"
        />
        <q-input
          v-model="credential.password"
          label="Password"
          type="password"
          :rules="[val => !!val || 'Password is required']"
        />
        <q-btn color="primary" label="Login with app password" @click="login" />
        <q-btn
          type="a"
          href="https://bitbucket.org/account/settings/app-passwords/"
          target="_blank"
          outline
          color="primary"
          label="Obtain app password"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BitbucketCredential } from 'src/store/bitbucket/state';
import Vue from 'src/base/Vue';

@Component({})
export default class PageLogin extends Vue {
  credential: BitbucketCredential = {
    username: '',
    password: ''
  };

  mounted() {
    this.$store.commit('app/title', 'Login');
  }

  login() {
    if (!this.credential.username || !this.credential.password) {
      this.$q.notify('Username and password required');
      return;
    }
    this.$store.commit('bitbucket/login', this.credential);
    void this.$router.push({ path: '/dashboard' });
  }
}
</script>
