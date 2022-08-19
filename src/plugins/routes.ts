import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Client from "@/views/Client.vue";
import ClientAddUpdate from "@/windows/client/ClientAddUpdate.vue";
import ClientDelete from "@/windows/client/ClientDelete.vue";

const routes = [
   { path: "/", component: Home, name: "home" },
   { path: "/client", component: Client, name: "client" },
   { path: "/client-add", component: ClientAddUpdate, name: "client-add" },
   { path: "/client-update/:id", component: ClientAddUpdate, name: "client-update" },
   { path: "/client-delete/:id", component: ClientDelete, name: "client-delete" }
];

Vue.use(VueRouter);
const router = new VueRouter({
   routes: routes,
   mode: "hash",
});

export default router;
