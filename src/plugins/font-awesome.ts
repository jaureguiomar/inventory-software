import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
   faUsers, faArrowLeft, faPlus,
   faXmark, faPenToSquare, faArrowsRotate
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUsers);
library.add(faArrowLeft);
library.add(faPlus);
library.add(faXmark);
library.add(faPenToSquare);
library.add(faArrowsRotate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
