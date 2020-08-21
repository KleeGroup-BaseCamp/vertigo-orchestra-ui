const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/process/:name", component: () => import("pages/Process.vue") },
      {
        path: "/process/:name/executions",
        component: () => import("pages/Execution.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
