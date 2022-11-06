import { createRouter, createWebHashHistory, _RouteLocationBase } from "vue-router";
import Login from "@/views/Login.vue";
import BranchSelect from "@/views/BranchSelect.vue";
import BranchDisabled from "@/views/BranchDisabled.vue";
import Home from "@/views/Home.vue";
import Sale from "@/views/Sale.vue";
import Client from "@/views/Client.vue";
import ClientSee from "@/windows/client/ClientSee.vue";
import ClientAddUpdate from "@/windows/client/ClientAddUpdate.vue";
import ClientDelete from "@/windows/client/ClientDelete.vue";
import Supplier from "@/views/Supplier.vue";
import SupplierSee from "@/windows/supplier/SupplierSee.vue";
import SupplierAddUpdate from "@/windows/supplier/SupplierAddUpdate.vue";
import SupplierDelete from "@/windows/supplier/SupplierDelete.vue";
import Product from "@/views/Product.vue";
import ProductSee from "@/windows/product/ProductSee.vue";
import ProductAddUpdate from "@/windows/product/ProductAddUpdate.vue";
import ProductDelete from "@/windows/product/ProductDelete.vue";
import Category from "@/views/Category.vue";
import CategorySee from "@/windows/category/CategorySee.vue";
import CategoryAddUpdate from "@/windows/category/CategoryAddUpdate.vue";
import CategoryDelete from "@/windows/category/CategoryDelete.vue";
import User from "@/views/User.vue";
import UserSee from "@/windows/user/UserSee.vue";
import UserAddUpdate from "@/windows/user/UserAddUpdate.vue";
import UserDelete from "@/windows/user/UserDelete.vue";
import UserRole from "@/views/UserRole.vue";
import UserRoleSee from "@/windows/user-role/UserRoleSee.vue";
import UserRoleAddUpdate from "@/windows/user-role/UserRoleAddUpdate.vue";
import UserRoleDelete from "@/windows/user-role/UserRoleDelete.vue";
import store from "@/plugins/store";
import { validateBranchSelect, validateBranchActive } from "@/plugins/mixins/router-guard";
import { AuthTokenStore, BranchStore, PosStore, SessionStore } from "@/interfaces/store";

const routes = [
   {
      path: "/login",
      component: Login,
      name: "login",
      meta: {
         requiresAuth: false
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/branch-select",
      component: BranchSelect,
      name: "branch-select",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/branch-disabled",
      component: BranchDisabled,
      name: "branch-disabled",
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
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/sale",
      component: Sale,
      name: "sale",
      meta: {
         requiresAuth: true
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/client",
      component: Client,
      name: "client",
      meta: {
         requiresAuth: true
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/client-see/:id",
      component: ClientSee,
      name: "client-see",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/client-add",
      component: ClientAddUpdate,
      name: "client-add",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/client-update/:id",
      component: ClientAddUpdate,
      name: "client-update",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/client-delete/:id",
      component: ClientDelete,
      name: "client-delete",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/supplier",
      component: Supplier,
      name: "supplier",
      meta: {
         requiresAuth: true
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/supplier-see/:id",
      component: SupplierSee,
      name: "supplier-see",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/supplier-add",
      component: SupplierAddUpdate,
      name: "supplier-add",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/supplier-update/:id",
      component: SupplierAddUpdate,
      name: "supplier-update",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/supplier-delete/:id",
      component: SupplierDelete,
      name: "supplier-delete",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/product",
      component: Product,
      name: "product",
      meta: {
         requiresAuth: true
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/product-see/:id",
      component: ProductSee,
      name: "product-see",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/product-add",
      component: ProductAddUpdate,
      name: "product-add",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/product-update/:id",
      component: ProductAddUpdate,
      name: "product-update",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/product-delete/:id",
      component: ProductDelete,
      name: "product-delete",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/category",
      component: Category,
      name: "category",
      meta: {
         requiresAuth: true
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/category-see/:id",
      component: CategorySee,
      name: "category-see",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/category-add",
      component: CategoryAddUpdate,
      name: "category-add",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/category-update/:id",
      component: CategoryAddUpdate,
      name: "category-update",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/category-delete/:id",
      component: CategoryDelete,
      name: "category-delete",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user",
      component: User,
      name: "user",
      meta: {
         requiresAuth: true
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/user-see/:id",
      component: UserSee,
      name: "user-see",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user-add",
      component: UserAddUpdate,
      name: "user-add",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user-update/:id",
      component: UserAddUpdate,
      name: "user-update",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user-delete/:id",
      component: UserDelete,
      name: "user-delete",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user-role",
      component: UserRole,
      name: "user-role",
      meta: {
         requiresAuth: true
      },
      beforeEnter: [ validateBranchSelect, validateBranchActive ]
   },
   {
      path: "/user-role-see/:id",
      component: UserRoleSee,
      name: "user-role-see",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user-role-add",
      component: UserRoleAddUpdate,
      name: "user-role-add",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user-role-update/:id",
      component: UserRoleAddUpdate,
      name: "user-role-update",
      meta: {
         requiresAuth: false
      }
   },
   {
      path: "/user-role-delete/:id",
      component: UserRoleDelete,
      name: "user-role-delete",
      meta: {
         requiresAuth: false
      }
   }
];

const router = createRouter({
   routes: routes,
   history: createWebHashHistory()
});

router.beforeEach((to:_RouteLocationBase, from:_RouteLocationBase, next:Function) => {
   const server = localStorage.getItem("server");
   const token:AuthTokenStore = JSON.parse(localStorage.getItem("token") || `{
      "access_token": "",
      "refresh_token": "",
      "expires_in": -1
   }`);
   const branch:BranchStore = JSON.parse(localStorage.getItem("branch") || `{
      "id": -1,
      "name": "",
      "telephone": "",
      "address": ""
   }`);
   const pos:PosStore = JSON.parse(localStorage.getItem("pos") || `{
      "id": -1,
      "name": ""
   }`);
   const session:SessionStore = JSON.parse(localStorage.getItem("session") || `{
      "loggued_in": false,
      "user": {
         "id": -1,
         "username": "",
         "email": "",
         "first_name": "",
         "last_name": "",
         "role": {
            "id": -1,
            "name": ""
         }
      }
   }`);
   store.commit("SET_SERVER_DATA", server);
   store.commit("SET_AUTH_TOKEN_DATA", token);
   store.commit("SET_BRANCH_DATA", branch);
   store.commit("SET_POS_DATA", pos);
   store.commit("SET_SESSION_LOGGUED_IN_DATA", session.loggued_in);
   store.commit("SET_SESSION_USER_DATA", session.user);

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
