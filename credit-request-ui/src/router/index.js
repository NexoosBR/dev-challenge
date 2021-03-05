import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/client",
    name: "client",
    component: () => import("../views/client.vue")
  },
  {
    path: "/credit",
    name: "credit",
    component: () => import("../views/credit.vue")
  },
  {
    path: "/loan",
    name: "loan",
    component: () => import("../views/loan.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
