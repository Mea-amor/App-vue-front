// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Snotify, { SnotifyPosition } from "vue-snotify";
import PortalVue from "portal-vue";
import "animate.css";

import router from "./router";
import store from "./store";

import Loading from "components/lib/loading";
import apiClient from "./utils/http-common";
import CenterContainer from "components/lib/center-container";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import {
  faUserSecret,
  faHome,
  faUserGraduate,
  faUser,
  faBook,
  faPencil,
  faTrashCan,
  faAdd,
  faGear,
  faCheck,
  faAddressBook,
  faAddressCard,
  faAngleDown,
  faAngleUp,
  faArrowRightFromBracket,
  faStop
} from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */

/* add icons to the library */
library.add(
  faUserSecret,
  faPencil,
  faHome,
  faTrashCan,
  faUserGraduate,
  faUser,
  faBook,
  faAdd,
  faGear,
  faCheck,
  faAddressBook,
  faAddressCard,
  faAngleDown,
  faAngleUp,
  faArrowRightFromBracket,
  faStop
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
};

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(Snotify, options);
Vue.config.productionTip = false;

Vue.component("loading", Loading);
Vue.component("center-container", CenterContainer);
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
