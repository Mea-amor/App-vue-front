<style>
@import "../../assets/styles/table-custom.css";
</style>
<template>
  <div class="back">
    <div class="table-div seconBack">
      <button class="btn btn-success btn-pers" @click="showAddFunction">
        Ajout d'un etudiant
        <font-awesome-icon icon="fa-solid fa-add" style="color:white" />
      </button>
      <div class="bg-table">
        <notify-delete v-if="isDelete" @deleteToogle="toggleDelete" />
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="ol">Id</th>
              <th scope="col">Numero</th>
              <th scope="col">Name</th>
              <th scope="col">Sexe</th>
              <th scope="col" style="text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(etudiant, index) in etudiants" :key="index">
              <th scope="row">{{ etudiant.id }}</th>
              <td>{{ etudiant.numero }}</td>
              <td>{{ etudiant.name }}</td>
              <td>{{ etudiant.sexe }}</td>
              <td class="td-pers">
                <button
                  class="btn btn-success btn-sm btn-pers"
                  @click="takeIndex(index, etudiant.id)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-pencil"
                    style="color:white"
                  />
                  Modifier
                </button>
                <button
                  class="btn btn-danger btn-sm btn-pers"
                  @click="toggleDelete()"
                >
                  <!-- @click="destroyOne(index, etudiant.id)" -->
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
    <addEtudiant
      :etudiants="etudiants"
      :currentIndex="currentIndex"
      v-if="showAdd || currentIndex"
      @newValue="ToggleAdd"
    />
  </div>
</template>

<script>
import EtudiantDataService from "../../api/EtudiantDataService";
import AddEtudiant from "./formAdd";
import Loading from "../loading";
import NotifyDelete from "../notification/notifyDelete";
export default {
  components: {
    AddEtudiant,
    Loading,
    NotifyDelete
  },
  name: "etudiant",
  data() {
    return {
      etudiants: [],
      currentEtudiant: null,
      currentIndex: null,
      showAdd: false,
      isLoading: false,
      isDelete: false
    };
  },
  methods: {
    retrieveEtudiant() {
      this.isLoading = true;
      EtudiantDataService.getAll()
        .then(response => {
          this.etudiants = response.data.data;
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
    takeIndex(index, etudiantId) {
      this.currentIndex = [index, etudiantId];
    },
    toggleDelete() {
      if (this.isDelete) {
        this.isDelete = false;
      } else {
        this.isDelete = true;
      }
    },
    destroyOne(index, etudiantId) {
      EtudiantDataService.delete(etudiantId)
        .then(resp => {
          this.etudiants.splice(index, 1);
          this.$store.dispatch("addToFavorites", {
            status: true,
            message: "Suppression etudiant avec succée",
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
    this.retrieveEtudiant();
  }
};
</script>
