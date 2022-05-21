<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-0 text-white bg-dark desgin-personalize"
  >
    <a
      href="/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <svg class="bi me-2" width="40" height="32">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-4">
        <font-awesome-icon
          icon="fa-solid fa-book"
          style="position: relative;"
        />Gestion</span
      >
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item d-flex ps-3" @click="ActiveLink(0)">
        <font-awesome-icon
          icon="fa-solid fa-house"
          style="position: relative;
"
        />
        <router-link to="/" class="nav-link text-white"
          ><i class="fa-regular fa-house"></i> Home</router-link
        >
        <!-- faUserGraduate -->
      </li>
      <li class="d-flex ps-3">
        <font-awesome-icon
          icon="fa-solid fa-user"
          style="position: relative;
"
        />
        <router-link to="/professeur" class=" text-white">
          Professeur</router-link
        >
      </li>
      <li class="d-flex ps-3">
        <font-awesome-icon
          icon="fa-solid fa-user-graduate"
          style="position: relative;
"
        />
        <router-link to="/etudiant" class="text-white"> Etudiant</router-link>
      </li>
      <li class="d-flex ps-3">
        <font-awesome-icon icon="fa-solid fa-book" />
        <router-link to="/matiere" class=" text-white">Matiere </router-link>
      </li>
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
a.router-link-exact-active {
  background-color: #dfdfdf;
}
.desgin-personalize {
  width: 280px;
  height: 566px;
}
.nav-link {
  display: flex;
}
.bg-liActive {
  background: #2f353a91;
}
</style>
