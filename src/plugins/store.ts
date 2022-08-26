import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
   state: {
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
         loaded_reply: false
      }
   },
   getters: {
      getClientLoadedReply(state) {
         return state.client.loaded_reply;
      },
      getSupplierLoadedReply(state) {
         return state.supplier.loaded_reply;
      },
      getProductLoadedReply(state) {
         return state.product.loaded_reply;
      },
      getCategoryLoadedReply(state) {
         return state.category.loaded_reply;
      }
   },
   mutations: {
      SET_CLIENT_LOADED_REPLY: (state, data:boolean) => {
         state.client.loaded_reply = data;
      },
      SET_SUPPLIER_LOADED_REPLY: (state, data:boolean) => {
         state.client.loaded_reply = data;
      },
      SET_PRODUCT_LOADED_REPLY: (state, data:boolean) => {
         state.product.loaded_reply = data;
      },
      SET_CATEGORY_LOADED_REPLY: (state, data:boolean) => {
         state.category.loaded_reply = data;
      }
   }
});

export default store;
