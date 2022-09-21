import { createApp } from "vue";
import App from "./App.vue";
import i18n from "@/plugins/i18n";
import router from "@/plugins/routes";
import store, { key } from "@/plugins/store";
import FontAwesomeIcon from "@/plugins/font-awesome";
// Global Template styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/scss/bootstrap-theme.scss";
import "@/assets/scss/styles.scss";
import "@/assets/scss/input-counter.scss";

createApp(App)
   .use(router)
   .use(store, key)
   .use(i18n)
   .component("font-awesome-icon", FontAwesomeIcon)
   .mount("#app");
