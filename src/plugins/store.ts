import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
   state: {
      client: {
         loaded_reply: false
      }
   },
   getters: {
      getClientLoadedReply(state) {
         return state.client.loaded_reply;
      }
   },
   mutations: {
      SET_CLIENTT_LOADED_REPLY: (state, data:boolean) => {
         state.client.loaded_reply = data;
      }
   }
});

export default store;
