/** * Created by vouill on 11/13/17. */

<template>
  <div>
    <loading v-if="loading" />
    <!-- <notify /> -->
    <div v-if="isAuthenticated">
      <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed" />
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1>
        Bienvenue dans la page d'accueil de cette application
      </h1>
      <p>
        Dans cette application, vous pouvez faire de l'ajout, de modification,
        de suppression
      </p>
      <div>
        <b-button variant="dark" @click="increment()">{{
          name_button
        }}</b-button>
        <login v-if="loginShow" />
        <register v-if="!loginShow" />
      </div>
    </div>
  </div>
</template>

<style>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

<script>
import fakeFeed from "./fakeFeed";
import FeedItem from "./feedItem.vue";
import { mapGetters } from "vuex";
import Login from "components/login";
import Notify from "components/notification";
import Register from "components/register";

export default {
  components: {
    Login,
    FeedItem,
    Register
    // Notify
  },
  name: "home",
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    }
  },
  data() {
    return { fakeFeed, loginShow: true, name_button: "register" };
  },
  // actions
  methods: {
    increment() {
      if (this.loginShow) {
        this.loginShow = false;
        this.name_button = "login";
      } else {
        this.loginShow = true;
        this.name_button = "register";
      }
    }
  }
};
</script>
