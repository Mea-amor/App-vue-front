import Vue from "vue";
import Router from "vue-router";
import Home from "components/home";
import Etudiant from "components/etudiant";
import Matiere from "components/matiere";
import Professeur from "components/professeur";
import Account from "components/account";
import Login from "components/login";
import RelaionProf from "components/relationLogic/professeur";
import RelationEtu from "components/relationLogic/etudiant";
import RelationMat from "components/relationLogic/matiere";

import store from "../store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/etudiant",
      name: "Etudiant",
      component: Etudiant,
      children: [
        {
          path: "etudiant-matiere/:id",
          name: "EtudiantMatiere",
          component: RelationEtu
        }
      ]
    },
    {
      path: "/matiere",
      name: "Matiere",
      component: Matiere,
      children: [
        {
          path: "matiere-etudiant/:id",
          name: "MatiereEtudiant",
          component: RelationMat
        }
      ]
    },
    {
      path: "/professeur",
      name: "Professeur",
      component: Professeur,
      children: [
        {
          path: "prof-matiere/:id",
          name: "ProfMatiere",
          component: RelaionProf
        }
      ]
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    }
  ]
});
