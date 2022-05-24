/** * Created by vouill on 11/13/17. */

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Test Appli</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/professeur" class="nav-link"
              >Professeur</router-link
            >
            <!-- <a class="nav-link" href="#">Professeur</a> -->
          </li>
          <li class="nav-item">
            <router-link to="/etudiant" class="nav-link">Etudiant</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/matiere" class="nav-link">Matiere</router-link>
          </li>
        </ul>
        <ul>
          <li v-if="isProfileLoaded">
            <router-link to="/account">{{ name }}</router-link>
          </li>
          <li v-if="isAuthenticated" @click="logout">
            <span class="logout">Logout</span>
          </li>
          <li v-if="!isAuthenticated && !authLoading">
            <router-link to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a {
  color: black;
  text-decoration: none;
}
.navigation {
  display: flex;
  color: white;
  align-items: center;
  background-color: #ffa035;
  padding: 5px;

  ul {
    display: flex;
    &:first-child {
      flex-grow: 1;
    }
    li {
      padding-right: 1em;
    }
  }
}
.brand {
  display: flex;
  align-items: center;
}
.logout {
  &:hover {
    cursor: pointer;
  }
}
</style>

<script>
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "actions/auth";

export default {
  name: "navigation",
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/"));
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.auth.status === "loading",
      name: state => `${state.user.profile.title} ${state.user.profile.name}`
    })
  }
};
</script>
