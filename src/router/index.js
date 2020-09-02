import Vue from "vue";
import VueRouter from "vue-router";
import Homeumd from "../views/Homeumd.vue";
import Processumd from "../views/Processumd.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Homeumd,
  },
  {
    path: "/process/:name",
    name: "Process",
    component: Processumd,
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
