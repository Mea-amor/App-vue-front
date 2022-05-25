// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Loading from "components/lib/loading";
import CenterContainer from "components/lib/center-container";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Snotify, { SnotifyPosition } from "vue-snotify";
// eslint-disable-next-line no-unused-vars
import apiClient from "./utils/http-common";
// eslint-disable-next-line no-unused-vars
import PortalVue from "portal-vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
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
  faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
  faArrowRightFromBracket
);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
};

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(Snotify, options);
Vue.config.productionTip = false;

Vue.component("loading", Loading);
Vue.component("center-container", CenterContainer);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
