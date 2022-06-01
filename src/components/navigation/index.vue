/** * Created by vouill on 11/13/17. */

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light "
    style="
    width: 100%;background: transparent;
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="    margin-left: 30px;">
        <img
          src="../../assets/books.png"
          alt=""
          width="25px"
          height="25px"
          class="imgIcon"
        />
        <span class="text1">
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

          <li class="nav-item liCustum">
            <div class="bg-icon-social">
              <img src="../../assets/iconSocial/fb.png" alt="" width="25px" />
              <img
                src="../../assets/iconSocial/github.png"
                alt=""
                width="25px"
              />
              <img
                src="../../assets/iconSocial/messenger.png"
                alt=""
                width="25px"
              />
            </div>
          </li>
        </ul>
        <!-- <div class="accountIcon">?</div> -->
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Shadows+Into+Light?family=Passion+One?family=Dancing+Script&display=swap");
.imgIcon {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 5px;
  top: 5px;
}
.accountIcon {
  font-family: "Passion One", cursive;
  color: rgb(255, 255, 255);
  background: #658e59;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
    rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  cursor: pointer;
}
.bg-icon-social {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #d7d2d230;
  border-radius: 14px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.liCustum {
  display: flex;
  align-items: center;
  width: 110px;
}
a {
  color: black;
  text-decoration: none;
  font-family: "Nunito", sans-serif;
}
.text1 {
}
.text2 {
  font-size: 20px;
  color: #3bee52f0;
}

.navigation {
  display: flex;
  color: white;
  align-items: center;
  background-color: #ffa035;
  padding: 5px;
}
.navigation ul {
  display: flex;
}
.navigation ul::first-child {
  flex-grow: 1;
}
.navigation ul li {
  padding-right: 1em;
}
.brand {
  display: flex;
  align-items: center;
}
/* .logout {
  &:hover {
    cursor: pointer;
  }
} */
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
