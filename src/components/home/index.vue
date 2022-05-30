/** * Created by vouill on 11/13/17. */

<template>
  <div>
    <loading v-if="loading" />

    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <div>
        <img
          src="../../assets/sectionimg/test2.jpg"
          style="max-width: 100%;
          height: auto;"
        />
      </div>
      <div class="title-home">
        <h1>
          Bienvenue dans la page d'accueil de cette application
        </h1>
        <p style="    color: cornsilk;">
          Dans cette application, vous pouvez faire de l'ajout, de modification,
          de suppression
        </p>
      </div>
      <div class="btn-customn">
        <button class="bt-1" @click="open(true)">Se connecter</button>
        <button class="bt-2" @click="open(false)">S'enregistrer</button>
      </div>

      <div class="divS" v-if="divlogin">
        <b-button @click="toogleSign()" class="tn-dd">{{
          name_button
        }}</b-button>
        <login v-if="loginShow" @closeDiv="closeval()" />
        <register v-if="!loginShow" @closeDiv="closeval()" />
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@200&family=Tiro+Telugu&display=swap");

.tn-dd {
  position: absolute;
  top: 154px;
  left: 239px;
}
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.title-home {
  position: absolute;
  top: 200px;
  width: 500px;
  margin-left: 150px;
  text-align: center;
  font-family: "Roboto Mono", monospace;
  background: #090b0c24;
  border-radius: 13px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.btn-customn {
  position: absolute;
  top: 437px;
  left: 296px;
  display: flex;
  gap: 7px;
}
.bt-1 {
  background: #574561;
  border: 1px solid #4d7e3e73;
  border: 1px solid #2a483673;
  height: 40px;
  width: 167px;
  color: #ececec;
  font-family: "Tiro Telugu", serif;
  box-shadow: rgb(0 0 0 / 7%) 0px 1px 1px, rgb(0 0 0 / 7%) 0px 2px 2px,
    rgb(0 0 0 / 7%) 0px 4px 4px, rgb(0 0 0 / 7%) 0px 8px 8px,
    rgb(0 0 0 / 7%) 0px 16px 16px;
}
.bt-2 {
  background: #366c40;
  border: 1px solid #4d7e3e73;
  border: 1px solid #2a483673;
  height: 40px;
  width: 167px;
  color: #ececec;
  font-family: "Tiro Telugu", serif;
  box-shadow: rgb(0 0 0 / 7%) 0px 1px 1px, rgb(0 0 0 / 7%) 0px 2px 2px,
    rgb(0 0 0 / 7%) 0px 4px 4px, rgb(0 0 0 / 7%) 0px 8px 8px,
    rgb(0 0 0 / 7%) 0px 16px 16px;
}
</style>

<script>
import fakeFeed from "./fakeFeed";
import FeedItem from "./feedItem.vue";
import { mapGetters } from "vuex";
import Login from "components/login";

import Register from "components/register";

export default {
  components: {
    Login,
    FeedItem,
    Register
  },
  name: "home",
  computed: {
    ...mapGetters(["getnotify", "isAuthenticated", "authStatus"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    }
  },
  data() {
    return {
      fakeFeed,
      loginShow: true,
      name_button: "register",
      divlogin: false
    };
  },
  // actions
  methods: {
    toogleSign() {
      if (this.loginShow) {
        this.loginShow = false;
        this.name_button = "login";
      } else {
        this.loginShow = true;
        this.name_button = "register";
      }
    },
    closeval() {
      this.divlogin = false;
    },
    open(value) {
      this.divlogin = true;
      if (value) {
        this.loginShow = true;
        this.name_button = "register";
      } else {
        this.loginShow = false;
        this.name_button = "login";
      }
    }
  }
};
</script>
