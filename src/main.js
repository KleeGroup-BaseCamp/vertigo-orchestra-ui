import AppStandalone from "./App-standalone.vue";
import App from "./views/App.vue";
import Home from "./views/Home.vue";
import Process from "./views/Process.vue";
import { fr, en } from "./lang/lang.js";
import Quasar from "quasar";

if(Quasar.lang.fr) {
  Quasar.lang.fr.vui = {...Quasar.lang.fr.vui, fr}
}
if(Quasar.lang.enUs) {
  Quasar.lang.enUs.vui = {...Quasar.lang.enUs.vui, ...en}
}
//Quasar.lang.set(Quasar.lang.fr);

export function install(Vue) {
  Vue.component("vui-orchestra-standalone", AppStandalone);
  Vue.component("vui-orchestra", App);
  Vue.component("vui-orchestra-home", Home);
  Vue.component("vui-orchestra-process", Process);
}
