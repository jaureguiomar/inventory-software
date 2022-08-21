import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Client from "@/views/Client.vue";
import ClientAddUpdate from "@/windows/client/ClientAddUpdate.vue";
import ClientDelete from "@/windows/client/ClientDelete.vue";
import Supplier from "@/views/Supplier.vue";
import SupplierAddUpdate from "@/windows/supplier/SupplierAddUpdate.vue";
import SupplierDelete from "@/windows/supplier/SupplierDelete.vue";

const routes = [
   { path: "/", component: Home, name: "home" },
   { path: "/client", component: Client, name: "client" },
   { path: "/client-add", component: ClientAddUpdate, name: "client-add" },
   { path: "/client-update/:id", component: ClientAddUpdate, name: "client-update" },
   { path: "/client-delete/:id", component: ClientDelete, name: "client-delete" },
   { path: "/supplier", component: Supplier, name: "supplier" },
   { path: "/supplier-add", component: SupplierAddUpdate, name: "supplier-add" },
   { path: "/supplier-update/:id", component: SupplierAddUpdate, name: "supplier-update" },
   { path: "/supplier-delete/:id", component: SupplierDelete, name: "supplier-delete" }
];

Vue.use(VueRouter);
const router = new VueRouter({
   routes: routes,
   mode: "hash",
});

export default router;
