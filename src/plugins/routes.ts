import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
   { path: "/", component: HelloWorld, name: "hello-world" }
];

Vue.use(VueRouter);
const router = new VueRouter({
   routes: routes,
   mode: "hash",
});

export default router;
