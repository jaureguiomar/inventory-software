import Vue from "vue";
import App from "./App.vue";
// Template Plugins
import router from "@/plugins/routes";
import store from "@/plugins/store";
import i18n from "@/plugins/i18n";
import "@/plugins/event-bus";
import "@/plugins/axios";
import "@/plugins/filters";
import "@/plugins/directives";
import "@/plugins/bootstrap";
import "@/plugins/font-awesome";
// Global Template styles
import "@/assets/scss/styles.scss";

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  i18n,
});
