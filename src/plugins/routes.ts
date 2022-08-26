import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Client from "@/views/Client.vue";
import ClientAddUpdate from "@/windows/client/ClientAddUpdate.vue";
import ClientDelete from "@/windows/client/ClientDelete.vue";
import Supplier from "@/views/Supplier.vue";
import SupplierAddUpdate from "@/windows/supplier/SupplierAddUpdate.vue";
import SupplierDelete from "@/windows/supplier/SupplierDelete.vue";
import Product from "@/views/Product.vue";
import ProductAddUpdate from "@/windows/product/ProductAddUpdate.vue";
import ProductDelete from "@/windows/product/ProductDelete.vue";
import Category from "@/views/Category.vue";
import CategoryAddUpdate from "@/windows/category/CategoryAddUpdate.vue";
import CategoryDelete from "@/windows/category/CategoryDelete.vue";
import store from './store';

const routes = [
   {
      path: "/login",
      component: Login,
      name: "login",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/",
      component: Home,
      name: "home",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/client",
      component: Client,
      name: "client",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/client-add",
      component: ClientAddUpdate,
      name: "client-add",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/client-update/:id",
      component: ClientAddUpdate,
      name: "client-update",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/client-delete/:id",
      component: ClientDelete,
      name: "client-delete",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/supplier",
      component: Supplier,
      name: "supplier",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/supplier-add",
      component: SupplierAddUpdate,
      name: "supplier-add",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/supplier-update/:id",
      component: SupplierAddUpdate,
      name: "supplier-update",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/supplier-delete/:id",
      component: SupplierDelete,
      name: "supplier-delete",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/product",
      component: Product,
      name: "product",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/product-add",
      component: ProductAddUpdate,
      name: "product-add",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/product-update/:id",
      component: ProductAddUpdate,
      name: "product-update",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/product-delete/:id",
      component: ProductDelete,
      name: "product-delete",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/category",
      component: Category,
      name: "category",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/category-add",
      component: CategoryAddUpdate,
      name: "category-add",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/category-update/:id",
      component: CategoryAddUpdate,
      name: "category-update",
      meta: {
         requiresAuth: true
      }
   },
   {
      path: "/category-delete/:id",
      component: CategoryDelete,
      name: "category-delete",
      meta: {
         requiresAuth: true
      }
   },
];

Vue.use(VueRouter);
const router = new VueRouter({
   routes: routes,
   mode: "hash",
});

router.beforeEach((to:any, from:any, next:Function) => {
   if(to.name === "login")
      next();
   else if(!to.meta.requiresAuth)
      next();
   else if(store.getters.getSessionLogguedIn)
      next();
   else
      next({ name: "login" });
});

export default router;
