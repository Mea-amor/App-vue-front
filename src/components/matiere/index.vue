<style>
@import "../../assets/styles/table-custom.css";
@import url("https://fonts.googleapis.com/css2?familyDosis:wght@300&display=swap");
</style>
<template>
  <div class="back">
    <router-view></router-view>
    <div class="table-div seconBack">
      <button class="btn btn-success btn-pers" @click="showAddFunction">
        Ajout d'un matiere
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
          <btnSearchMatiere
            @searchValue="filterSearch"
            @resetValue="filterSearch()"
          />
        </div>
        <notify-delete
          v-if="isDelete"
          @deleteToogle="toggleDelete"
          @confirmToogle="destroyOne"
          value="matiere"
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
                  <div class="thC" @click="sendSorter('libelle')">
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
                  <div class="thC" @click="sendSorter('coefficient')">
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
                    @click="toggleDelete(index, matiere.id)"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-trash-can"
                      style="color:white"
                    />
                    Supprimer
                  </button>
                  <button class="btn btn-secondary btn-sm btn-pers">
                    <router-link
                      :to="{
                        name: 'MatiereEtudiant',
                        params: { id: matiere.id }
                      }"
                      class=" text-white"
                    >
                      <font-awesome-icon
                        icon="fa-solid fa-eye"
                        style="color:white;width: 15px;"
                      />
                    </router-link>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!--  -->
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
    <addMatiere
      :matieres="matieres"
      :currentIndex="currentIndex"
      v-if="showAdd || currentIndex"
      @newValue="ToggleAdd"
    />
  </div>
</template>

<script>
import MatiereDataService from "../../api/MatiereDataService";
import AddMatiere from "./formAdd";
import Loading from "../loading";
import NotifyDelete from "../notification/notifyDelete";
import btnSearchMatiere from "../btnSearch/matiere.vue";

export default {
  name: "matiere",
  components: {
    AddMatiere,
    Loading,
    NotifyDelete,
    btnSearchMatiere
  },
  data() {
    return {
      matieres: [],
      currentMatiere: [],
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
        { type: "libelle", isAsc: false, isClick: false },
        { type: "coefficient", isAsc: false, isClick: false }
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
    retrieveMatiere() {
      const params = this.getRequestParams(
        this.currentPage,
        this.perPage,
        this.filter
      );
      this.isLoading = true;
      MatiereDataService.getAll(params)
        .then(response => {
          this.matieres = response.data.data.data;
          this.rows = response.data.data.total;
          this.isLoading = false;
          this.sortBy = false;
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
      if (newTitle) this.retrieveMatiere();
    },
    takeIndex(index, matiereId) {
      this.currentIndex = [index, matiereId];
    },
    toggleDelete(index, matiereId) {
      if (this.isDelete) {
        this.isDelete = false;
      } else {
        this.isDelete = true;
        this.currentMatiere[0] = index;
        this.currentMatiere[1] = matiereId;
      }
    },
    destroyOne() {
      MatiereDataService.delete(this.currentMatiere[1])
        .then(resp => {
          this.matieres.splice(this.currentMatiere[0], 1);
          this.$store.dispatch("addToFavorites", {
            status: true,
            message: "Suppression matiere avec succée",
            nameIcon: "SuccessIcon.png",
            success: false
          });
          if (this.matieres.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.isDelete = false;
          this.retrieveMatiere();
          this.currentEtudiant = [];
        })
        .catch(e => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.currentPage = value;
      this.retrieveMatiere();
    },
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveMatiere();
    },
    filterSearch(type = "name", value) {
      if (value && type) {
        this.filter.type = type;
        this.filter.value = value.trim();
      } else {
        this.filter.value = "";
        this.filter.type = "";
      }
      this.retrieveMatiere();
    },
    sendSorter(value) {
      this.sortBy = true;
      this.sorter.map((data, index) => {
        if (value === data.type) {
          data.isAsc = !data.isAsc;
          data.isClick = true;
          this.retrieveMatiere();
          //
          console.log("After retrieveData");
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
    this.retrieveMatiere();
  }
};
</script>
<style></style>
