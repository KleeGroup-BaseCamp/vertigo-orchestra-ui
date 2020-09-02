<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="text-white gradient-bg">
      <q-toolbar class="">
        <q-toolbar-title
          ><a href="/">
            <q-avatar> <img src="./assets/vertigo-io.png" /> </q-avatar
          ></a>
          Orchestra UI
        </q-toolbar-title>
        <q-space /><q-btn flat round icon="power_settings_new" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Copyright &copy; 2020 - 2020
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import router from "./router";
export default {
  name: "app",
  router,

  data() {
    return {
      left: false,
    };
  },
};
</script>
<style lang="scss">
$primary: #4396cb; // Duplicate of quasar variables (To refactor)
$secondary: #4353cb;
.gradient-bg {
  background-image: linear-gradient(to right, $secondary, $primary);
}
div.q-loading-bar {
  display: none;
}
</style>
