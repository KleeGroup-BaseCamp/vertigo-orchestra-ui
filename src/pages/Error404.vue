<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div class="text-h1">
        404
      </div>
      <div class="q-my-lg"><img src="../assets/vertigo-io.png" /></div>

      <div class="text-h2" style="opacity:.7">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>
