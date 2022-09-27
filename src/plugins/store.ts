import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { State, SaleProduct } from "@/interfaces/store";
import { findValueBy } from './mixins';

const store = createStore<State>({
   state() {
      return {
         loggued_in: false,
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
            loaded_reply: false
         }
      }
   },
   getters: {
      getLogguedIn(state) {
         return state.loggued_in;
      },
      getSaleProductReply(state) {
         return state.sale.product;
      },
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
      SET_LOGGUED_IN_DATA: (state, data) => {
         state.loggued_in = data;
      },
      SET_SALE_PRODUCT_REPLY: (state, data:Array<SaleProduct>) => {
         state.sale.product = data;
      },
      ADD_SALE_PRODUCT_REPLY: (state, data:SaleProduct) => {
         const finded_index = findValueBy(state.sale.product, data.id, "id");
         if(finded_index < 0) {
            state.sale.product.push(data);
         } else {
            state.sale.product[finded_index].sale_quantity ++;
            state.sale.product[finded_index].sale_total = (parseFloat(state.sale.product[finded_index].sale_price) * state.sale.product[finded_index].sale_quantity).toFixed(2);
         }
      },
      SET_CLIENT_LOADED_REPLY: (state, data:boolean) => {
         state.client.loaded_reply = data;
      },
      SET_SUPPLIER_LOADED_REPLY: (state, data:boolean) => {
         state.supplier.loaded_reply = data;
      },
      SET_PRODUCT_LOADED_REPLY: (state, data:boolean) => {
         state.product.loaded_reply = data;
      },
      SET_CATEGORY_LOADED_REPLY: (state, data:boolean) => {
         state.category.loaded_reply = data;
      }
   }
});

export const key: InjectionKey<Store<State>> = Symbol();
export default store;
