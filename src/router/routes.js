import {
  redirecrIfVdom2fsIsCorrect,
  redirectIfVdom2fsIsNotSeted,
} from "./utils";

export default [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    beforeEnter: redirectIfVdom2fsIsNotSeted,
  },
  {
    path: "/config/:id",
    name: "Config",
    component: () => import("@/views/Config.vue"),
    beforeEnter: redirectIfVdom2fsIsNotSeted,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
    beforeEnter: redirectIfVdom2fsIsNotSeted,
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("@/views/SetUp.vue"),
    beforeEnter: redirecrIfVdom2fsIsCorrect,
  },
];
