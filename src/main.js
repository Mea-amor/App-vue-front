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
