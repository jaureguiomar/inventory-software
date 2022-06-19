import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
   state: {
      some_data: null,
   },
   getters: {},
   mutations: {},
   actions: {},
});

// module.exports = store; // Same
export default store;
