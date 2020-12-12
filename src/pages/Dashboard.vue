<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ClassComponent.vue';
import { Vue, Component } from 'vue-property-decorator';
// import { BitbucketCredential } from 'src/store/bitbucket/state';

@Component({
  // components: { ExampleComponent }
})
export default class PageDashboard extends Vue {}
</script>
