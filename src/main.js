import AppStandalone from "./App-standalone.vue";
import VuOApp from "./views/VuOApp.vue";
import VuOHome from "./views/VuOHome.vue";
import VuOProcess from "./views/VuOProcess.vue";

import Fr from "./lang/vertigo-orchestra-fr.js";
import En from "./lang/vertigo-orchestra-en.js";
import Quasar from "quasar";

var VertigoOrchestraUi = {

//Quasar.lang.set(Quasar.lang.fr);

  install : function (Vue) {
    Vue.component("vui-orchestra-standalone", AppStandalone);
    Vue.component("vui-orchestra", VuOApp);
    Vue.component("vui-orchestra-home", VuOHome);
    Vue.component("vui-orchestra-process", VuOProcess);

  } 
  
  
}

if(Quasar.lang.fr) { 
  Quasar.lang.fr.vui = {...Quasar.lang.fr.vui, ...Fr}
}
if(Quasar.lang.enUs) {
  Quasar.lang.enUs.vui = {...Quasar.lang.enUs.vui, ...En}
}

if (window) {
  window.VertigoOrchestraUi = VertigoOrchestraUi
  window.Vue.use(VertigoOrchestraUi)
}

export default VertigoOrchestraUi;
