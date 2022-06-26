import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
   faUsers, faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUsers);
library.add(faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);
