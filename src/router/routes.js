const routes = [
  {
    path: "/",
    component: () => import("layouts/Unauthenticated.vue"),
    children: [
      {
        name: "landingPage",
        path: "",
        component: () => import("pages/LandingPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/Authenticated.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("src/pages/authenticated/Home.vue"),
      },
      {
        path: "account",
        name: "account",
        component: () => import("src/pages/authenticated/Account.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
