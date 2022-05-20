<template>
  <div class="back">
    <div class="table-div seconBack">
      <button class="btn btn-success btn-pers" @click="showAddFunction">
        Ajout d'un Professeur
        <font-awesome-icon icon="fa-solid fa-add" style="color:white" />
      </button>
      <div class="bg-table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Numero</th>
              <th scope="col">Name</th>
              <th scope="col">Categorie</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(professeur, index) in professeurs" :key="index">
              <th scope="row">{{ professeur.id }}</th>
              <td>{{ professeur.numero }}</td>
              <td>{{ professeur.name }}</td>
              <td>{{ professeur.categorie }}</td>
              <td class="td-pers">
                <button
                  class="btn btn-success btn-sm btn-pers"
                  @click="takeIndex(index, professeur.id)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-pencil"
                    style="color:white"
                  />
                  <!-- <router-link to="/professeur/addPro"> -->
                  Modifier
                  <!-- </router-link> -->
                </button>
                <button
                  class="btn btn-danger btn-sm btn-pers"
                  @click="destroyOne(index, professeur.id)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-trash-can"
                    style="color:white"
                  />
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <loading v-if="isLoading" />
      </div>
    </div>
    <addProfesseur
      :professeurs="professeurs"
      :currentIndex="currentIndex"
      v-if="showAdd || currentIndex"
      @newValue="ToggleAdd"
    />
  </div>
</template>
<style>
@import "../../assets/styles/table-custom.css";
</style>
<script>
import ProfesseurDataService from "../../api/ProfesseurDataService";
import AddProfesseur from "./formAdd";
import Loading from "../loading";

export default {
  components: {
    AddProfesseur,
    Loading
  },
  name: "professeur",
  data() {
    return {
      professeurs: [],
      currentProfesseur: null,
      currentIndex: null,
      showAdd: false,
      isLoading: false
    };
  },
  methods: {
    retrieveProfesseur() {
      this.isLoading = true;
      ProfesseurDataService.getAll()
        .then(response => {
          this.professeurs = response.data.data;
          this.isLoading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    showAddFunction() {
      this.showAdd = true;
    },
    ToggleAdd(newTitle) {
      this.showAdd = false;
      this.currentIndex = null;
    },
    takeIndex(index, ProfesseurId) {
      this.currentIndex = [index, ProfesseurId];
    },
    destroyOne(index, ProfesseurId) {
      console.log(index, ProfesseurId);
      ProfesseurDataService.delete(ProfesseurId)
        .then(resp => {
          console.log(resp);
          this.professeurs.splice(index, 1);
          this.$store.dispatch("addToFavorites", {
            status: true,
            message: "Suppression Professeur avec succée",
            nameIcon: "SuccessIcon.png",
            success: false
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveProfesseur();
  }
};
</script>
