import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Clients from "@/views/Clients.vue";
import NewWindow from "@/views/NewWindow.vue";

const routes = [
   { path: "/", component: Home, name: "home" },
   { path: "/clients", component: Clients, name: "clients" },
   { path: "/new-window", component: NewWindow, name: "new-window" }
];

Vue.use(VueRouter);
const router = new VueRouter({
   routes: routes,
   mode: "hash",
});

export default router;
