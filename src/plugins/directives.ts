import Vue from "vue";

Vue.directive("focus", {
   bind(el, binding, vnode, oldNode) {
      Vue.nextTick(() => el.focus());
   }
});
