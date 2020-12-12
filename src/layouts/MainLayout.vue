<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Bitbucket Pull Request Dashboard - {{ $store.state.app.title }}
        </q-toolbar-title>
        <q-btn
          v-if="$store.state.bitbucket.isLogin"
          flat
          label="Logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class LayoutMain extends Vue {
  logout() {
    this.$store.commit('bitbucket/logout');
    void this.$router.push({ path: '/' });
  }
}
</script>
