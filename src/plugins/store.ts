import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface GenericInterface {
   loaded_reply: boolean;
}
interface Product {
   id: number;
   is_active: number;
   created: Date;
   updated: Date;
   code: string;
   name: string;
   description: string|null;
   buy_price: string;
   sale_price: string;
   quantity: number;
   sale_quantity: number;
   sale_total: string;
}
interface SaleInterface {
   product: Array<Product>;
}
interface State {
   loggued_in: boolean;
   sale: SaleInterface;
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
      SET_SALE_PRODUCT_REPLY: (state, data:Array<Product>) => {
         state.sale.product = data;
      },
      ADD_SALE_PRODUCT_REPLY: (state, data:Product) => {
         state.sale.product.push(data);
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
