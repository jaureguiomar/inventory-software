import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Clients from "@/views/Clients.vue";

const routes = [
   { path: "/", component: Home, name: "home" },
   { path: "/clients", component: Clients, name: "clients" }
];

Vue.use(VueRouter);
const router = new VueRouter({
   routes: routes,
   mode: "hash",
});

export default router;
