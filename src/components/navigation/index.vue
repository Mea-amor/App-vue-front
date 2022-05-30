/** * Created by vouill on 11/13/17. */

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light "
    style="
    width: 100%;background: transparent;
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="    margin-left: 30px;"
        ><span class="text1">
          Gestion
        </span>
        <span class="text2">
          Scolaire
        </span>
      </a>
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
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        style="    flex-grow: 0;gap: 80px;"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 linkP" style="gap: 18px;">
          <li class="nav-item">
            <router-link to="/" class="nav-link">ACCUEIL</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/professeur" class="nav-link"
              >PROFESSEUR</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/etudiant" class="nav-link">ETUDIANT</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/matiere" class="nav-link">MATIERE</router-link>
          </li>
        </ul>
        <ul>
          <li v-if="isProfileLoaded">
            <router-link to="/account">{{ name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Shadows+Into+Light&display=swap");
.text1 {
  font-family: "Pacifico", cursive;
}
.text2 {
  font-family: "Shadows Into Light", cursive;
  font-size: 20px;
  color: #3bee52f0;
}
a {
  color: black;
  text-decoration: none;
  font-family: "Nunito", sans-serif;
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
.linkP li a.router-link-exact-active {
  background-color: #87878726;
  border-right: 3px solid black;
  border-color: #198754bf;
  border-radius: 6px;
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
