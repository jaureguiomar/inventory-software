import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
   faPlusCircle, faMinusCircle,
   faUtensils, faPlus,
   faRectangleList, faCircleChevronRight,
   faCheck, faDownload, faEraser, faDatabase,
   faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlusCircle);
library.add(faMinusCircle);
library.add(faUtensils);
library.add(faPlus);
library.add(faRectangleList);
library.add(faCircleChevronRight);
library.add(faCheck);
library.add(faDownload);
library.add(faEraser);
library.add(faDatabase);
library.add(faXmark);
Vue.component('font-awesome-icon', FontAwesomeIcon);
