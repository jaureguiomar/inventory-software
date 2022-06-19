import Vue from "vue";

const eventBus = {};

Vue.use(eventBus);
eventBus.install = function (Vue) {
   Vue.prototype.$bus = new Vue();
};

export default eventBus;
