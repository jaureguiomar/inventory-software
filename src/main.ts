import { createApp } from "vue";
import FontAwesomeIcon from "@/plugins/font-awesome";
import VueBarcodeScanner from "vue3-barcode-scanner";
import { Quasar } from "quasar";
import App from "@/App.vue";
import i18n from "@/plugins/i18n";
import router from "@/plugins/routes";
import store, { key } from "@/plugins/store";
import quasarUserOptions from "@/plugins/quasar";
// Global Template styles
// import "@/assets/scss/bootstrap-theme.scss";
import "@/assets/scss/styles.scss";
// import "@/assets/scss/input-counter.scss";

createApp(App)
   .use(router)
   .use(store, key)
   .use(i18n)
   .use(VueBarcodeScanner)
   .use(Quasar, quasarUserOptions)
   .component("font-awesome-icon", FontAwesomeIcon)
   .mount("#app");
