<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-0 text-white bg-darkC desgin-personalize"
  >
    <div class="bg-div">
      <a
        href="/"
        class="d-flex  mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-4" style="color: #010402;">
          <font-awesome-icon
            icon="fa-solid fa-book"
            style="position: relative;right: 33px;"
          />Gestion</span
        >
      </a>
    </div>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto lipers" style="width:100%">
      <router-link to="/" class=" text-white">
        <li class=" d-flex ps-3">
          <font-awesome-icon
            icon="fa-solid fa-house"
            style="position: relative;
"
          />
          ACCUEIL

          <!-- faUserGraduate -->
        </li>
      </router-link>
      <router-link to="/professeur" class=" text-white">
        <li class="d-flex ps-3">
          <font-awesome-icon
            icon="fa-solid fa-user"
            style="position: relative;
"
          />
          PROFESSEUR
        </li>
      </router-link>
      <router-link to="/etudiant" class="text-white">
        <li class="d-flex ps-3">
          <font-awesome-icon
            icon="fa-solid fa-user-graduate"
            style="position: relative;
"
          />
          ETUDIANTS
        </li>
      </router-link>
      <router-link to="/matiere" class=" text-white">
        <li class="d-flex ps-3">
          <font-awesome-icon icon="fa-solid fa-book" />
          MATIERE
        </li>
      </router-link>
      <router-link to="/" class=" text-white">
        <li
          class="d-flex ps-3"
          style="border-top: 1px solid #00000026;
          margin-top: 10px;"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
          DECONNEXION
        </li>
      </router-link>
    </ul>
    <hr />
    <div class="dropdown">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="dropdownUser1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt=""
          width="32"
          height="32"
          class="rounded-circle me-2"
        />
        <strong>mdo </strong>
      </a>
      <ul
        class="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdownUser1"
      >
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {
      showAdd: false
    };
  },
  computed: {},
  methods: {}
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@300&display=swap");
.desgin-personalize {
  width: 280px;
  height: 591px;
}
.nav-link {
  display: flex;
}
.bg-liActive {
  background: #2f353a91;
}
.lipers li {
  height: 45px;
  gap: 16px;
  color: #696c68;
  font-family: "Barlow", sans-serif;
}
.lipers a.router-link-exact-active {
  background-color: #87878726;
  border-right: 3px solid black;
  border-color: #198754bf;
  color: #4d504c;
}
.lipers a {
  text-decoration: none;
}
.bg-div {
  width: 100%;
  height: 8%;
  display: flex;
  border-bottom: 1px solid #00000014;
}
.bg-darkC {
  background-color: #152c0914 !important;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0) 0px 0px 1px 0px;
}
</style>
