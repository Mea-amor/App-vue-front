<template>
  <div class="back">
    <div class="table-div seconBack">
      <button class="btn btn-success btn-pers" @click="showAddFunction">
        <!-- <router-link to="/etudiant/addEtudiant"> -->
        Ajout d'un matiere
        <font-awesome-icon icon="fa-solid fa-add" style="color:white" />
        <!-- </router-link> -->
      </button>
      <div class="bg-table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Numero</th>
              <th scope="col">Libelle</th>
              <th scope="col">Coefficient</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(matiere, index) in matieres" :key="index">
              <th scope="row">{{ matiere.id }}</th>
              <td>{{ matiere.numero }}</td>
              <td>{{ matiere.libelle }}</td>
              <td>{{ matiere.coefficient }}</td>
              <td class="td-pers">
                <button
                  class="btn btn-success btn-sm btn-pers"
                  @click="takeIndex(index, matiere.id)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-pencil"
                    style="color:white"
                  />
                  Modifier
                </button>
                <button
                  class="btn btn-danger btn-sm btn-pers"
                  @click="destroyOne(index, matiere.id)"
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
        <!--  -->
        <loading v-if="isLoading" />
      </div>
    </div>
    <addMatiere
      :matieres="matieres"
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
import MatiereDataService from "../../api/MatiereDataService";
import AddMatiere from "./formAdd";
import Loading from "../loading";

export default {
  name: "matiere",
  components: {
    AddMatiere,
    Loading
  },
  data() {
    return {
      matieres: [],
      currentMatiere: null,
      currentIndex: null,
      showAdd: false,
      isLoading: false
    };
  },
  methods: {
    retrieveMatiere() {
      this.isLoading = true;
      MatiereDataService.getAll()
        .then(response => {
          this.matieres = response.data.data;
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
    takeIndex(index, matiereId) {
      this.currentIndex = [index, matiereId];
    },
    destroyOne(index, matiereId) {
      MatiereDataService.delete(matiereId)
        .then(resp => {
          this.matieres.splice(index, 1);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveMatiere();
  }
};
</script>
<style></style>
