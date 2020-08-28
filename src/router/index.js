import Vue from "vue";
import VueRouter from "vue-router";
import Homeumd from "../views/Homeumd.vue";
import Processumd from "../views/Processumd.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Processumd,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
