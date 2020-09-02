import Appstandalone from "./App-standalone.vue";
import App from "./views/App.vue";
import Homeumd from "./views/Homeumd.vue";
import Processumd from "./views/Processumd.vue";

export function install(Vue) {
  Vue.component("orchestra-ui-standalone", Appstandalone);
  Vue.component("orchestra-ui", App);
  Vue.component("homeumd", Homeumd);
  Vue.component("processumd", Processumd);
}
