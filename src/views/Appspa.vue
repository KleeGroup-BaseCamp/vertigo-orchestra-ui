<template>
  <div><router-view /></div>
</template>

<script>
import router from "../router";
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
div.q-loading-bar {
  display: none;
}
</style>
