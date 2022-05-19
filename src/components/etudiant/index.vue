<template>
  <div class="back">
    <div class="table-div seconBack">
      <button class="btn btn-success " @click="showAddFunction">
        <router-link to="/etudiant/addEtudiant"
          >Ajout d'un etudiant</router-link
        >
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Numero</th>
            <th scope="col">Name</th>
            <th scope="col">Sexe</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(etudiant, index) in etudiants" :key="index">
            <th scope="row">{{ etudiant.id }}</th>
            <td>{{ etudiant.numero }}</td>
            <td>{{ etudiant.name }}</td>
            <td>{{ etudiant.sexe }}</td>
            <td>
              <button
                class="btn btn-success"
                @click="takeIndex(index, etudiant.id)"
              >
                <router-link to="/etudiant/addEtudiant">
                  Modifier
                </router-link>
              </button>
              <button
                class="btn btn-danger"
                @click="destroyOne(index, etudiant.id)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <router-view></router-view> -->
    <addEtudiant
      :etudiants="etudiants"
      :currentIndex="currentIndex"
      v-if="showAdd || currentIndex"
      @newValue="ToggleAdd"
    />
  </div>
</template>
<style>
.back {
  background: rgb(255, 255, 255);
  width: 100%;
  height: 567px;
  position: relative;
}
.seconBack {
  padding: 8px 14px 0px 14px;
}
</style>
<script>
import EtudiantDataService from "../../api/EtudiantDataService";
import AddEtudiant from "./formAdd";
export default {
  components: {
    AddEtudiant
  },
  name: "etudiant",
  data() {
    return {
      etudiants: [],
      currentEtudiant: null,
      currentIndex: null,
      showAdd: false
    };
  },
  methods: {
    retrieveEtudiant() {
      EtudiantDataService.getAll()
        .then(response => {
          this.etudiants = response.data.data;
          console.log(response.data);
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
    destroyOne(index, etudiantId) {
      EtudiantDataService.delete(etudiantId)
        .then(resp => {
          this.etudiants.splice(index, 1);
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
