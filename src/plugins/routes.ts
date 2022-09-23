import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Client from "@/views/Client.vue";
import ClientSee from "@/windows/client/ClientSee.vue";
// import ClientAddUpdate from "@/windows/client/ClientAddUpdate.vue";
import ClientDelete from "@/windows/client/ClientDelete.vue";
// import Supplier from "@/views/Supplier.vue";
// import SupplierSee from "@/windows/supplier/SupplierSee.vue";
// import SupplierAddUpdate from "@/windows/supplier/SupplierAddUpdate.vue";
// import SupplierDelete from "@/windows/supplier/SupplierDelete.vue";
// import Product from "@/views/Product.vue";
// import ProductSee from "@/windows/product/ProductSee.vue";
// import ProductAddUpdate from "@/windows/product/ProductAddUpdate.vue";
// import ProductDelete from "@/windows/product/ProductDelete.vue";
// import Category from "@/views/Category.vue";
// import CategorySee from "@/windows/category/CategorySee.vue";
// import CategoryAddUpdate from "@/windows/category/CategoryAddUpdate.vue";
// import CategoryDelete from "@/windows/category/CategoryDelete.vue";
import store from "./store";

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
      path: "/client-see/:id",
      component: ClientSee,
      name: "client-see",
      meta: {
         requiresAuth: false
      }
   },
   // {
   //    path: "/client-add",
   //    component: ClientAddUpdate,
   //    name: "client-add",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/client-update/:id",
   //    component: ClientAddUpdate,
   //    name: "client-update",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   {
      path: "/client-delete/:id",
      component: ClientDelete,
      name: "client-delete",
      meta: {
         requiresAuth: false
      }
   },
   // {
   //    path: "/supplier",
   //    component: Supplier,
   //    name: "supplier",
   //    meta: {
   //       requiresAuth: true
   //    }
   // },
   // {
   //    path: "/supplier-see/:id",
   //    component: SupplierSee,
   //    name: "supplier-see",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/supplier-add",
   //    component: SupplierAddUpdate,
   //    name: "supplier-add",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/supplier-update/:id",
   //    component: SupplierAddUpdate,
   //    name: "supplier-update",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/supplier-delete/:id",
   //    component: SupplierDelete,
   //    name: "supplier-delete",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/product",
   //    component: Product,
   //    name: "product",
   //    meta: {
   //       requiresAuth: true
   //    }
   // },
   // {
   //    path: "/product-see/:id",
   //    component: ProductSee,
   //    name: "product-see",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/product-add",
   //    component: ProductAddUpdate,
   //    name: "product-add",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/product-update/:id",
   //    component: ProductAddUpdate,
   //    name: "product-update",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/product-delete/:id",
   //    component: ProductDelete,
   //    name: "product-delete",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/category",
   //    component: Category,
   //    name: "category",
   //    meta: {
   //       requiresAuth: true
   //    }
   // },
   // {
   //    path: "/category-see/:id",
   //    component: CategorySee,
   //    name: "category-see",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/category-add",
   //    component: CategoryAddUpdate,
   //    name: "category-add",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/category-update/:id",
   //    component: CategoryAddUpdate,
   //    name: "category-update",
   //    meta: {
   //       requiresAuth: false
   //    }
   // },
   // {
   //    path: "/category-delete/:id",
   //    component: CategoryDelete,
   //    name: "category-delete",
   //    meta: {
   //       requiresAuth: false
   //    }
   // }
];

const router = createRouter({
   routes: routes,
   history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
   const session = JSON.parse(localStorage.getItem("session") || `{
      "loggued_in": false
   }`);
   store.commit("SET_LOGGUED_IN_DATA", session.loggued_in);

   if(!to.name) {
      if(session.loggued_in)
         next({ name: "home" });
      else
         next({ name: "login" });
   } else if(to.name === "login") {
      if(session.loggued_in)
         next({ name: "home" });
      else
         next();
   } else if(!to.meta.requiresAuth) {
      next();
   } else {
      if(session.loggued_in)
         next();
      else
         next({ name: "login" });
   }
});

export default router;
