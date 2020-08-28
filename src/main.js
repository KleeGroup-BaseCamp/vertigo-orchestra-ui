// import Vue from 'vue'
// import App from './App.vue'
// import './quasar'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

import App from "./App.vue";
import Appspa from "./views/Appspa.vue";
// import Home from "./views/Home.vue";
import Homeumd from "./views/Homeumd.vue";
// import Process from "./views/Process.vue";
import Processumd from "./views/Processumd.vue";

export function install(Vue /*options*/) {
  Vue.component("orchestra-ui", App);
  Vue.component("orchestra-ui-spa", Appspa);
  // Vue.component("home", Home);
  Vue.component("homeumd", Homeumd);
  // Vue.component("process", Process);
  Vue.component("processumd", Processumd);
}

// export { default as router } from "./router/index.js";
