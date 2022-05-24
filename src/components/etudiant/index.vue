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
        <!-- <div class="mb-3">
          Items per Page:
          <select v-model="pageSize" @change="handlePageSizeChange($event)">
            <option v-for="size in pageSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </div> -->
        <div class="mt-3">
          <!-- <div class="mb-3">
              Items per Page:
              <select v-model="perPage" @change="handlePageSizeChange($event)">
                <option v-for="size in pageSizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </div> -->
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            last-number
            @change="handlePageChange"
          ></b-pagination>
          <!-- <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            first-number
            last-number
          ></b-pagination> -->
          <div class="mb-3">
            Items per Page:
            <select v-model="perPage" @change="handlePageSizeChange($event)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
          <p class="mt-3">Current Page: {{ currentPage }}</p>
          <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            small
          ></b-table>
        </div>
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
      isDelete: false,
      perPage: 5,
      pageSizes: [5, 10, 15, 20, 30, 50, 100],
      currentPage: 1,
      items: [
        { id: 1, first_name: "Fred", last_name: "Flintstone" },
        { id: 2, first_name: "Wilma", last_name: "Flintstone" },
        { id: 3, first_name: "Barney", last_name: "Rubble" },
        { id: 4, first_name: "Betty", last_name: "Rubble" },
        { id: 5, first_name: "Pebbles", last_name: "Flintstone" },
        { id: 6, first_name: "Bamm Bamm", last_name: "Rubble" },
        { id: 7, first_name: "The Great", last_name: "Gazzoo" },
        { id: 8, first_name: "Rockhead", last_name: "Slate" },
        { id: 9, first_name: "Pearl", last_name: "Slaghoople" }
      ]
    };
  },
  methods: {
    getRequestParams(page, pageSize) {
      let params = {};
      if (page) {
        params["page"] = page;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    retrieveEtudiant() {
      const params = this.getRequestParams(this.currentPage, this.perPage);
      console.log("params : ", params);
      this.isLoading = true;
      EtudiantDataService.getAll()
        .then(response => {
          // this.etudiants = response.data.data;
          console.log(response);
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
    },

    handlePageChange(value) {
      this.currentPage = value;
      console.log(this.currentPage);
      // this.retrieveTutorials();
    },
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      // this.retrieveTutorials();
    }
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  mounted() {
    this.retrieveEtudiant();
  }
};
</script>
