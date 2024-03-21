import { createRouter, createWebHashHistory } from "vue-router";
import {store} from "../models/store";

const permissionsRouteMap: Record<string, string> = {
  "/": "view_appointment",
  "/employees": "view_employee",
  "/departments": "view_department",
  "/customers": "view_customer",
}

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Appointments.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("../views/Employees.vue"),
  },
  {
    path: "/departments",
    name: "departments",
    component: () => import("../views/Departments.vue"),
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import("../views/Customers.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.getters.getUserInfo) {
    if (!store.getters.isInPermission(permissionsRouteMap[to.path])) {
      alert("Permission denied!");
    } else {
      next();
    }
  } else {
    if (to.path !== "/login") {
      next({name: "login"});
    } else {
      next();
    }
  }
});

export default router;
