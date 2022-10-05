import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { State, SaleProductStore, UserStore, BranchStore } from "@/interfaces/store";
import { findValueBy } from "@/plugins/mixins/general";

const store = createStore<State>({
   state() {
      return {
         is_online: false,
         automatic_bakup_done: false,
         offline_bakup_done: false,
         retrieve_unsync_data_done: false,
         branch: {
            id: -1,
            name: "",
            telephone: "",
            address: ""
         },
         session: {
            loggued_in: false,
            user: {
               username: "",
               email: "",
               first_name: "",
               last_name: "",
               role: {
                  id: -1,
                  name: ""
               }
            }
         },
         sale: {
            product: []
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
            loaded_get: false,
            loaded_create: false,
            loaded_update: false
         },
         user: {
            loaded_reply: false
         },
         user_role: {
            loaded_reply: false
         }
      }
   },
   getters: {
      getIsOnline(state:State) {
         return state.is_online;
      },
      getAutomaticBakupDone(state:State) {
         return state.automatic_bakup_done;
      },
      getOfflineBakupDone(state:State) {
         return state.offline_bakup_done;
      },
      getRetrieveUnsyncDataDone(state:State) {
         return state.retrieve_unsync_data_done;
      },
      getBranch(state:State) {
         return state.branch;
      },
      getBranchId(state:State) {
         return state.branch.id;
      },
      getSessionLogguedIn(state:State) {
         return state.session.loggued_in;
      },
      getSessionUser(state:State) {
         return state.session.user;
      },
      getSaleProduct(state:State) {
         return state.sale.product;
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
      getCategoryLoadedCreate(state:State) {
         return state.category.loaded_create;
      },
      getCategoryLoadedUpdate(state:State) {
         return state.category.loaded_update;
      },
      getUserLoadedReply(state:State) {
         return state.user.loaded_reply;
      },
      getUserLRoleoadedReply(state:State) {
         return state.user_role.loaded_reply;
      }
   },
   mutations: {
      SET_IS_ONLINE_DATA: (state:State, data:boolean) => {
         state.is_online = data;
      },
      SET_AUTOMATIC_BAKUP_DONE_DATA: (state:State, data:boolean) => {
         state.automatic_bakup_done = data;
      },
      SET_OFFLINE_BAKUP_DONE_DATA: (state:State, data:boolean) => {
         state.offline_bakup_done = data;
      },
      SET_RETRIEVE_UNSYNC_DATA_DONE_DATA: (state:State, data:boolean) => {
         state.retrieve_unsync_data_done = data;
      },
      SET_BRANCH_DATA: (state:State, data:BranchStore) => {
         state.branch = data;
      },
      SET_SESSION_LOGGUED_IN_DATA: (state:State, data:boolean) => {
         state.session.loggued_in = data;
      },
      SET_SESSION_USER_DATA: (state:State, data:UserStore) => {
         state.session.user = data;
      },
      SET_SALE_PRODUCT_REPLY: (state:State, data:Array<SaleProductStore>) => {
         state.sale.product = data;
      },
      ADD_SALE_PRODUCT_REPLY: (state:State, data:SaleProductStore) => {
         const finded_index = findValueBy(state.sale.product, data.id, "id");
         if(finded_index < 0) {
            state.sale.product.push({
               ...data,
               sale_quantity: 1,
               sale_total: data.sale_price
            });
         } else {
            state.sale.product[finded_index].sale_quantity ++;
            state.sale.product[finded_index].sale_total = (parseFloat(state.sale.product[finded_index].sale_price) * state.sale.product[finded_index].sale_quantity).toFixed(2);
         }
      },
      MINUS_SALE_PRODUCT_QUANTITY: (state:State, id_product:number) => {
         const finded_index = findValueBy(state.sale.product, id_product, "id");
         if(finded_index >= 0) {
            if(state.sale.product[finded_index].sale_quantity > 1) {
               state.sale.product[finded_index].sale_quantity --;
               state.sale.product[finded_index].sale_total = (parseFloat(state.sale.product[finded_index].sale_price) * state.sale.product[finded_index].sale_quantity).toFixed(2);
            }
         }
      },
      REMOVE_SALE_PRODUCT_REPLY: (state:State, id_product:number) => {
         const finded_index = findValueBy(state.sale.product, id_product, "id");
         if(finded_index >= 0)
            state.sale.product.splice(finded_index, 1);
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
      SET_CATEGORY_LOADED_CREATE: (state:State, data:boolean) => {
         state.category.loaded_create = data;
      },
      SET_CATEGORY_LOADED_UPDATE: (state:State, data:boolean) => {
         state.category.loaded_update = data;
      },
      SET_USER_LOADED_REPLY: (state:State, data:boolean) => {
         state.user.loaded_reply = data;
      },
      SET_USER_ROLE_LOADED_REPLY: (state:State, data:boolean) => {
         state.user_role.loaded_reply = data;
      }
   }
});

export const key: InjectionKey<Store<State>> = Symbol();
export default store;
