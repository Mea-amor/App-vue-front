<style>
@import "../../assets/styles/table-custom.css";
@import url("https://fonts.googleapis.com/css2?familyDosis:wght@300&display=swap");
.select-pers select {
  border: 1px solid #cfc8c8;
  color: #3e3e3e;
  font-family: "Dosis", sans-serif;
}
.back {
  font-family: "Dosis", sans-serif;
  margin-left: 1px;
}
.select-pers select {
  outline: none !important;
}
li:not(.active) > button {
  color: #389720;
}

li.active > button {
  z-index: 3;
  color: #fff;
  background-color: #39743bbd !important;
  border-color: #acb7ac9e !important;
}
.thC {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
<template>
  <div class="back">
    <div class="table-div seconBack">
      <button class="btn btn-success btn-pers" @click="showAddFunction">
        Ajout d'un etudiant
        <font-awesome-icon icon="fa-solid fa-add" style="color:white" />
      </button>
      <div class="bg-table">
        <div class="mb-2 select-pers d-flex ">
          <div class="me-auto">
            Items per Page:
            <select v-model="perPage" @change="handlePageSizeChange($event)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
          <btnSearch />
        </div>
        <notify-delete
          v-if="isDelete"
          @deleteToogle="toggleDelete"
          @confirmToogle="destroyOne"
        />
        <div class="position-relative" style="min-height: 105px;">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="ol">Id</th>
                <th scope="col">
                  <div class="thC">
                    <span>
                      Numero
                    </span>
                    <font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      style="color: #273835a6;"
                    />
                  </div>
                </th>
                <th scope="col">
                  <div class="thC">
                    <span>
                      Name
                    </span>
                    <font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      style="color: #273835a6;"
                    />
                  </div>
                </th>
                <th scope="col">
                  <div class="thC">
                    <span>
                      Sexe
                    </span>
                    <font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      style="color: #273835a6;"
                    />
                  </div>
                </th>
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
                    @click="toggleDelete(index, etudiant.id)"
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

        <div class=" d-flex " v-if="rows">
          <p class=" flex-grow-1" v-if="rows">
            Page : <span> {{ currentPage }}</span> Total :
            <span>{{ rows }}</span>
          </p>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            last-number
            @change="handlePageChange"
            align="right"
          ></b-pagination>
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
import BtnSearch from "../btnSearch";
export default {
  components: {
    AddEtudiant,
    Loading,
    NotifyDelete,
    BtnSearch
  },
  name: "etudiant",
  data() {
    return {
      etudiants: [],
      rows: null,
      currentEtudiant: [],
      currentIndex: null,
      showAdd: false,
      isLoading: false,
      isDelete: false,
      perPage: 5,
      pageSizes: [5, 10, 15, 20, 30, 50, 100],
      currentPage: 1
    };
  },
  methods: {
    getRequestParams(page, pageSize) {
      let params = {};
      if (page) {
        params["page"] = page;
      }
      if (pageSize) {
        params["per_page"] = pageSize;
      }
      return params;
    },
    retrieveEtudiant() {
      const params = this.getRequestParams(this.currentPage, this.perPage);
      this.isLoading = true;
      EtudiantDataService.getAll(params)
        .then(response => {
          this.etudiants = response.data.data.data;
          this.rows = response.data.data.total;
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
    toggleDelete(index, etudiantId) {
      if (this.isDelete) {
        this.isDelete = false;
      } else {
        this.isDelete = true;
        this.currentEtudiant[0] = index;
        this.currentEtudiant[1] = etudiantId;
      }
    },
    destroyOne() {
      EtudiantDataService.delete(this.currentEtudiant[1])
        .then(resp => {
          this.etudiants.splice(this.currentEtudiant[0], 1);
          this.$store.dispatch("addToFavorites", {
            status: true,
            message: "Suppression etudiant avec succée",
            nameIcon: "SuccessIcon.png",
            success: false
          });
          this.retrieveEtudiant();
          this.currentEtudiant = [];
          this.isDelete = false;
        })
        .catch(e => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.currentPage = value;
      this.retrieveEtudiant();
    },
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveEtudiant();
    }
  },
  computed: {
    // rows() {
    //   return this.etudiants.length;
    // }
  },
  mounted() {
    this.retrieveEtudiant();
  }
};
</script>
