import Vue from "vue";

Vue.directive("sampleDirective", {
   bind(el, binding, vnode, oldNode) {
      console.log("directive bind event");
      console.log(el, binding, vnode, oldNode);
   },
   inserted() {
      console.log("directive inserted event");
   },
   update() {
      console.log("directive update event");
   },
   componentUpdated() {
      console.log("directive componentUpdated event");
   },
   unbind() {
      console.log("directive unbind event");
   }
});

Vue.directive("sampleDirective2", (el, binding, vnode, oldNode) => {
   console.log("directive with bind && update");
   console.log(el, binding, vnode, oldNode);
});
