import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
   { path: "/", component: Home, name: "home" }
];

Vue.use(VueRouter);
const router = new VueRouter({
   routes: routes,
   mode: "hash",
});

export default router;
