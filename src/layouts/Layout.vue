<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="">
        <q-toolbar-title
          ><a href="/">
            <q-avatar> <img src="../assets/vertigo-io.png" /> </q-avatar
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
export default {
  data() {
    return {
      left: false
    };
  }
};
</script>
