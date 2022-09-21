import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface GenericInterface {
   loaded_reply: boolean;
}
interface State {
   loggued_in: boolean;
   client: GenericInterface;
   supplier: GenericInterface;
   product: GenericInterface;
   category: GenericInterface;
}
export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
   state() {
      return {
         loggued_in: false,
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

export default store;
