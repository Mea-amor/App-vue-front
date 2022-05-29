<style>
@import "../../assets/styles/table-custom.css";
@import url("https://fonts.googleapis.com/css2?familyDosis:wght@300&display=swap");
</style>
<template>
  <div class="back">
    <div class="table-div seconBack">
      <button class="btn btn-success btn-pers" @click="showAddFunction">
        Ajout d'un Professeur
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
          <btnSearchProf
            @searchValue="filterSearch"
            @resetValue="filterSearch()"
          />
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
                  <div class="thC" @click="sendSorter('numero')">
                    <span>
                      {{ sorter[0].type }}
                    </span>
                    <font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      style="color: #273835a6;"
                      v-if="!sorter[0].isAsc"
                    />
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up"
                      style="color: #273835a6;"
                      v-if="sorter[0].isAsc"
                    />
                  </div>
                </th>
                <th scope="col">
                  <div class="thC" @click="sendSorter('name')">
                    <span>
                      {{ sorter[1].type }}
                    </span>
                    <font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      style="color: #273835a6;"
                      v-if="!sorter[1].isAsc"
                    />
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up"
                      style="color: #273835a6;"
                      v-if="sorter[1].isAsc"
                    />
                  </div>
                </th>
                <th scope="col">
                  <div class="thC" @click="sendSorter('categorie')">
                    <span>
                      {{ sorter[2].type }}
                    </span>
                    <font-awesome-icon
                      icon="fa-solid fa-angle-down"
                      style="color: #273835a6;"
                      v-if="!sorter[2].isAsc"
                    />
                    <font-awesome-icon
                      icon="fa-solid fa-angle-up"
                      style="color: #273835a6;"
                      v-if="sorter[2].isAsc"
                    />
                  </div>
                </th>

                <th scope="col" style="text-align: center;">Action</th>
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
                    @click="toggleDelete(index, professeur.id)"
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
    <addProfesseur
      :professeurs="professeurs"
      :currentIndex="currentIndex"
      v-if="showAdd || currentIndex"
      @newValue="ToggleAdd"
    />
  </div>
</template>

<script>
import ProfesseurDataService from "../../api/ProfesseurDataService";
import AddProfesseur from "./formAdd";
import Loading from "../loading";
import NotifyDelete from "../notification/notifyDelete";
import BtnSearchProf from "../btnSearch/prof.vue";

export default {
  components: {
    AddProfesseur,
    Loading,
    NotifyDelete,
    BtnSearchProf
  },
  name: "professeur",
  data() {
    return {
      professeurs: [],
      noData: "",
      currentProfesseur: [],
      rows: null,
      currentIndex: null,
      showAdd: false,
      isLoading: false,
      isDelete: false,
      perPage: 5,
      pageSizes: [5, 10, 15, 20, 30, 50, 100],
      currentPage: 1,
      filter: {
        type: "",
        value: ""
      },
      sortBy: false,
      sorter: [
        { type: "numero", isAsc: false, isClick: false },
        { type: "name", isAsc: false, isClick: false },
        { type: "categorie", isAsc: false, isClick: false }
      ]
    };
  },
  methods: {
    getRequestParams(page, pageSize, filter) {
      let params = {};
      if (page) {
        params["page"] = page;
      }
      if (pageSize) {
        params["per_page"] = pageSize;
      }
      if (filter.type && filter.value) {
        params["type"] = filter.type;
        params["value"] = filter.value;
      }
      if (this.sortBy) {
        let filtre = this.sorter.filter(sort => sort.isClick);
        let value = filtre[0].isAsc ? "asc" : "desc";

        params["sortbyType"] = filtre[0].type;
        params["sortbyValue"] = value;
      }
      return params;
    },
    retrieveProfesseur() {
      const params = this.getRequestParams(
        this.currentPage,
        this.perPage,
        this.filter
      );
      this.isLoading = true;
      ProfesseurDataService.getAll(params)
        .then(response => {
          this.professeurs = response.data.data.data;
          this.rows = response.data.data.total;
          this.isLoading = false;
          this.sortBy = false;
          if (this.professeurs.length === 0) this.noData = "Pas des données";
          else this.noData = "";
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
      if (newTitle) this.retrieveProfesseur();
    },
    takeIndex(index, ProfesseurId) {
      this.currentIndex = [index, ProfesseurId];
    },
    toggleDelete(index, etudiantId) {
      if (this.isDelete) {
        this.isDelete = false;
      } else {
        this.isDelete = true;
        this.currentProfesseur[0] = index;
        this.currentProfesseur[1] = etudiantId;
      }
    },
    destroyOne() {
      ProfesseurDataService.delete(this.currentProfesseur[1])
        .then(resp => {
          console.log(resp);
          this.professeurs.splice(this.currentProfesseur[0], 1);
          this.$store.dispatch("addToFavorites", {
            status: true,
            message: "Suppression Professeur avec succée",
            nameIcon: "SuccessIcon.png",
            success: false
          });
          if (this.professeurs.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.isDelete = false;
          this.retrieveProfesseur();
          this.currentEtudiant = [];
          console.log(this.isDelete);
        })
        .catch(e => {
          console.log(e);
        });
    },
    handlePageChange(value) {
      this.currentPage = value;
      this.retrieveProfesseur();
    },
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveProfesseur();
    },
    filterSearch(type = "name", value) {
      if (value && type) {
        this.filter.type = type;
        this.filter.value = value.trim();
      } else {
        this.filter.value = "";
        this.filter.type = "";
      }
      this.retrieveProfesseur();
    },
    sendSorter(value) {
      this.sortBy = true;
      this.sorter.map(data => {
        if (value === data.type) {
          data.isAsc = !data.isAsc;
          data.isClick = true;
          this.retrieveProfesseur();
          // console.log("After retrieveData");
        }
        if (value !== data.type) {
          data.isAsc = false;
          data.isClick = false;
        }
        return data;
      });
    }
  },
  mounted() {
    this.retrieveProfesseur();
  }
};
</script>
