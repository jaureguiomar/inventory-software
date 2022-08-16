import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
   state: {
      some_data: "Default value",
   },
   getters: {
      getSomeData(state) {
         return state.some_data;
      }
   },
   mutations: {
      SET_SOME_DATA_DATA: (state, data) => {
         state.some_data = data;
      }
   }
});

export default store;
