import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import driver_routes from "./driver-routes";
import auth_routes from "./auth-routes";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    ...driver_routes,
    ...auth_routes,
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;