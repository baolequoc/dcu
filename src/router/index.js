import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/monitor",
      name: "monitor",
      component: () => import("../views/MonitorPage.vue"),
    },
    {
      path: "/control",
      name: "control",
      component: () => import("../views/ControlPage.vue"),
    },
    {
      path: "/performance",
      name: "performance",
      component: () => import("../views/PerformancePage.vue"),
    },
  ],
});

export default router;
