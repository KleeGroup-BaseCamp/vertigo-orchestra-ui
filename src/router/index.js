import Vue from "vue";
import VueRouter from "vue-router";
import VuOHome from "../views/VuOHome.vue";
import VuOProcess from "../views/VuOProcess.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: VuOHome,
  },
  {
    path: "/process/:name",
    name: "Process",
    component: VuOProcess,
    props : route => ({ processName: route.params.name })
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
