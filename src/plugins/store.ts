import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import {
   State, SaleProductStore, UserStore, BranchStore,
   PosStore, SaleContentStore, AuthTokenStore
} from "@/types/store";
import { findValueBy } from "@/plugins/mixins/general";
import { UserRolePermission } from "@/types/user-role-permission";

const store = createStore<State>({
   state() {
      return {
         server: "",
         is_online: false,
         automatic_bakup_done: false,
         offline_bakup_done: false,
         auth_token: {
            access_token: "",
            refresh_token: "",
            expires_in: -1
         },
         branch: {
            id: -1,
            name: "",
            telephone: "",
            address: ""
         },
         pos: {
            id: -1,
            name: ""
         },
         session: {
            loggued_in: false,
            user: {
               id: -1,
               username: "",
               email: "",
               first_name: "",
               last_name: "",
               role: {
                  id: -1,
                  name: "",
                  atributes_1: -1,
                  atributes_2: -1,
                  atributes_3: -1,
                  atributes_4: -1
               }
            },
            permission: []
         },
         sale: {
            curr_sale: {
               id: -1,
               name: "",
               product: []
            },
            saved_sale: []
         },
         client: {
            loaded_reply: false
         },
         supplier: {
            loaded_reply: false
         },
         product: {
            loaded_reply: false
         },
         category: {
            loaded_reply: false,
            loaded_get: false
         },
         user: {
            loaded_reply: false
         },
         user_role: {
            loaded_reply: false
         },
         sale_product: {
            loaded_reply: false
         },
         cash_cutoff: {
            loaded_reply: false
         },
         activity_log: {
            loaded_reply: false
         }
      }
   },
   getters: {
      getServer(state:State) {
         return state.server;
      },
      getIsOnline(state:State) {
         return state.is_online;
      },
      getAutomaticBakupDone(state:State) {
         return state.automatic_bakup_done;
      },
      getOfflineBakupDone(state:State) {
         return state.offline_bakup_done;
      },
      getAuthToken(state:State) {
         return state.auth_token;
      },
      getBranch(state:State) {
         return state.branch;
      },
      getBranchId(state:State) {
         return state.branch.id;
      },
      getPos(state:State) {
         return state.pos;
      },
      getPosId(state:State) {
         return state.pos.id;
      },
      getSessionLogguedIn(state:State) {
         return state.session.loggued_in;
      },
      getSessionUserId(state:State) {
         return state.session.user.id;
      },
      getSessionUserRole(state:State) {
         return state.session.user.role;
      },
      getSessionPermission(state:State) {
         return state.session.permission;
      },
      getSessionUser(state:State) {
         return state.session.user;
      },
      getSaleCurrSale(state:State) {
         return state.sale.curr_sale;
      },
      getSaleCurrSaleProduct(state:State) {
         return state.sale.curr_sale.product;
      },
      getSaleSavedSales(state:State) {
         return state.sale.saved_sale;
      },
      getClientLoadedReply(state:State) {
         return state.client.loaded_reply;
      },
      getSupplierLoadedReply(state:State) {
         return state.supplier.loaded_reply;
      },
      getProductLoadedReply(state:State) {
         return state.product.loaded_reply;
      },
      getCategoryLoadedReply(state:State) {
         return state.category.loaded_reply;
      },
      getCategoryLoadedGet(state:State) {
         return state.category.loaded_get;
      },
      getUserLoadedReply(state:State) {
         return state.user.loaded_reply;
      },
      getUserLRoleoadedReply(state:State) {
         return state.user_role.loaded_reply;
      },
      getSaleProductLoadedReply(state:State) {
         return state.sale_product.loaded_reply;
      },
      getCashCutoffLoadedReply(state:State) {
         return state.cash_cutoff.loaded_reply;
      },
      getActivityLogLoadedReply(state:State) {
         return state.activity_log.loaded_reply;
      }
   },
   mutations: {
      SET_SERVER_DATA: (state:State, data:string) => {
         state.server = data;
      },
      SET_IS_ONLINE_DATA: (state:State, data:boolean) => {
         state.is_online = data;
      },
      SET_AUTOMATIC_BAKUP_DONE_DATA: (state:State, data:boolean) => {
         state.automatic_bakup_done = data;
      },
      SET_OFFLINE_BAKUP_DONE_DATA: (state:State, data:boolean) => {
         state.offline_bakup_done = data;
      },
      SET_AUTH_TOKEN_DATA: (state:State, data:AuthTokenStore) => {
         state.auth_token = data;
      },
      SET_BRANCH_DATA: (state:State, data:BranchStore) => {
         state.branch = data;
      },
      SET_POS_DATA: (state:State, data:PosStore) => {
         state.pos = data;
      },
      SET_SESSION_LOGGUED_IN_DATA: (state:State, data:boolean) => {
         state.session.loggued_in = data;
      },
      SET_SESSION_USER_DATA: (state:State, data:UserStore) => {
         state.session.user = data;
      },
      SET_SESSION_PERMISSION_DATA: (state:State, data:UserRolePermission[]) => {
         state.session.permission = data;
      },
      SET_SALE_CURR_SALE: (state:State, data:SaleContentStore) => {
         state.sale.curr_sale = data;
      },
      SET_SALE_CURR_SALE_DATA_NAME: (state:State, sale_name:string) => {
         if(sale_name)
            state.sale.curr_sale.name = sale_name;
         else
            state.sale.curr_sale.name = `Sale ${ state.sale.curr_sale.id }`;
      },
      SET_SALE_CURR_SALE_DATA_AUTOMATIC: (state:State) => {
         const new_id = (state.sale.saved_sale.length === 0) ?
            1 : (state.sale.saved_sale[state.sale.saved_sale.length - 1].id + 1);
         state.sale.curr_sale.id = new_id;
         state.sale.curr_sale.name = `Sale ${ new_id }`;
      },
      ADD_SALE_SAVED_SALE: (state:State, data:SaleContentStore) => {
         state.sale.saved_sale.push(data);
      },
      REMOVE_SALE_SAVED_SALE: (state:State, id_saved_sale:number) => {
         const finded_index = findValueBy(state.sale.saved_sale, id_saved_sale, "id");
         if(finded_index >= 0)
            state.sale.saved_sale.splice(finded_index, 1);
      },
      SET_SALE_CURR_SALE_PRODUCT: (state:State, data:Array<SaleProductStore>) => {
         state.sale.curr_sale.product = data;
      },
      ADD_SALE_CURR_SALE_PRODUCT: (state:State, data:SaleProductStore) => {
         const finded_index = findValueBy(state.sale.curr_sale.product, data.id, "id");
         if(finded_index < 0) {
            state.sale.curr_sale.product.push({
               ...data,
               sale_quantity: 1,
               sale_total: data.sale_price
            });
         } else {
            state.sale.curr_sale.product[finded_index].sale_quantity ++;
            state.sale.curr_sale.product[finded_index].sale_total = (parseFloat(state.sale.curr_sale.product[finded_index].sale_price) * state.sale.curr_sale.product[finded_index].sale_quantity).toFixed(2);
         }
      },
      MINUS_SALE_CURR_SALE_PRODUCT_QUANTITY: (state:State, id_product:number) => {
         const finded_index = findValueBy(state.sale.curr_sale.product, id_product, "id");
         if(finded_index >= 0) {
            if(state.sale.curr_sale.product[finded_index].sale_quantity > 1) {
               state.sale.curr_sale.product[finded_index].sale_quantity --;
               state.sale.curr_sale.product[finded_index].sale_total = (parseFloat(state.sale.curr_sale.product[finded_index].sale_price) * state.sale.curr_sale.product[finded_index].sale_quantity).toFixed(2);
            }
         }
      },
      REMOVE_SALE_CURR_SALE_PRODUCT: (state:State, id_product:number) => {
         const finded_index = findValueBy(state.sale.curr_sale.product, id_product, "id");
         if(finded_index >= 0)
            state.sale.curr_sale.product.splice(finded_index, 1);
      },
      SET_CLIENT_LOADED_REPLY: (state:State, data:boolean) => {
         state.client.loaded_reply = data;
      },
      SET_SUPPLIER_LOADED_REPLY: (state:State, data:boolean) => {
         state.supplier.loaded_reply = data;
      },
      SET_PRODUCT_LOADED_REPLY: (state:State, data:boolean) => {
         state.product.loaded_reply = data;
      },
      SET_CATEGORY_LOADED_REPLY: (state:State, data:boolean) => {
         state.category.loaded_reply = data;
      },
      SET_CATEGORY_LOADED_GET: (state:State, data:boolean) => {
         state.category.loaded_get = data;
      },
      SET_USER_LOADED_REPLY: (state:State, data:boolean) => {
         state.user.loaded_reply = data;
      },
      SET_USER_ROLE_LOADED_REPLY: (state:State, data:boolean) => {
         state.user_role.loaded_reply = data;
      },
      SET_SALE_PRODUCT_LOADED_REPLY: (state:State, data:boolean) => {
         state.sale_product.loaded_reply = data;
      },
      SET_CASH_CUTOFF_LOADED_REPLY: (state:State, data:boolean) => {
         state.cash_cutoff.loaded_reply = data;
      },
      SET_ACTIVITY_LOG_LOADED_REPLY: (state:State, data:boolean) => {
         state.activity_log.loaded_reply = data;
      }
   }
});

export const key: InjectionKey<Store<State>> = Symbol();
export default store;
