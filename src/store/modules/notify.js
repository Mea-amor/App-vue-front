// import { NOTIFY_ERROR, NOTIFY_SUCCESS } from "../actions/notify";
import Vue from "vue";

const state = { status: false, message: "", nameIcon: "", success: "" };

const getters = {
  getnotify: state => state
};

const actions = {
  addToFavorites(context, payload) {
    context.commit("UPDATE_STATUS", payload);
  }
};

const mutations = {
  UPDATE_STATUS(state, payload) {
    state.status = payload.status;
    state.message = payload.message;
    state.nameIcon = payload.nameIcon;
    state.success = payload.success;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
