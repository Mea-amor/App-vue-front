<style>
@import "./css/prof.css";
</style>
<template>
  <div class="bgBack">
    <div class="content-data">
      <div class="closeProf" @click="$router.push('/professeur')">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
      <notify-delete
        v-if="isDelete"
        @deleteToogle="toggleDelete"
        @confirmToogle="destroyOne"
        value="matiere"
      />
      <div class="bg-form" v-if="isAdd">
        <div class="form-group formDesign">
          <select
            class="form-control"
            style="border: 1px solid #0000002b;    height: 30px;padding: 0;margin-bottom: 5px;"
            @change="handleValueChange($event)"
          >
            <option value="...">...</option>
            <option
              v-for="matiere in allMatieres"
              v-bind:value="matiere.libelle"
              v-bind:key="matiere.id"
            >
              {{ matiere.libelle }}</option
            >
          </select>

          <input
            type="text"
            v-model="matiere.numero"
            name=""
            id=""
            class="form-control"
            disabled
            placeholder="Numero"
            style="height: 30px;margin-bottom: 5px;"
          />
          <input
            type="text"
            name=""
            v-model="matiere.coefficient"
            id=""
            class="form-control"
            disabled
            placeholder="Coefficient"
            style="height: 30px;margin-bottom: 5px;"
          />
          <div class="btn-group" style="    right: auto;width: 100%;">
            <button type="button" class="btn btn-primary" @click="Save()">
              Enregistrer
            </button>
            <button type="button" class="btn btn-danger" @click="Cancel()">
              Annuler
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="triangle" v-if="isAdd">

        <button class="btnSelect">Ok</button>
      </div> -->
      <div class="add-btn" @click="showAdd()">
        +
      </div>
      <div class="part-1">
        <div class="part-1-a">
          <div class="round">
            {{ professeur.name[0] }}{{ professeur.name[1].toUpperCase() }}
          </div>
        </div>
        <div class="part-1-b">
          <p>{{ professeur.name | capitalizeName }}</p>
          <p>NUM : {{ professeur.numero }}</p>
          <p>CAT : {{ professeur.categorie }}</p>
        </div>
      </div>
      <div class="part-2">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>NUMERO</th>
              <th>LIBELLE</th>
              <th>COEFFICIENT</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(matiere, index) in matieres"
              :key="index"
              @click="toggleDelete(index, matiere.id)"
            >
              <th scope="row">{{ matiere.id }}</th>
              <td>{{ matiere.numero }}</td>
              <td>{{ matiere.libelle }}</td>
              <td>{{ matiere.coefficient }}</td>
            </tr>
            <tr v-if="!matieres.length">
              <td colspan="4" style="    height: 70px;text-align: center;">
                Pas des don nées
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import ProfesseurDataService from "../../api/ProfesseurDataService";
import MatiereDataService from "../../api/MatiereDataService";
import NotifyDelete from "../notification/notifyDelete";

export default {
  components: {
    NotifyDelete
  },
  name: "relaionProf",
  data: function() {
    return {
      value: "",
      currentMatiere: [],
      matieres: [],
      isIdProf: true,
      professeur: {},
      allMatieres: [],
      isDelete: false,
      isAdd: false,
      matiere: {
        idMatiere: 0,
        libelle: "",
        numero: "",
        coefficient: ""
      }
    };
  },
  methods: {
    getRequestParams() {
      let params = {};
      params["page"] = 1;
      params["per_page"] = 50;

      return params;
    },
    retrieveProfesseur() {
      let params = this.getRequestParams();
      let id = +this.$route.params.id;
      ProfesseurDataService.get(id)
        .then(response => {
          this.professeur = response.data.data[0];
          this.matieres = response.data.data[1];
          console.log(this.matieres);
          MatiereDataService.getAll(params)
            .then(response => {
              this.allMatieres = response.data.data.data.filter(data => {
                if (data.professeur_id == null) return data;
              });
              console.log(this.allMatieres);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    },
    showAdd() {
      if (this.isAdd) return (this.isAdd = false);
      else return (this.isAdd = true);
    },
    handleValueChange(event) {
      if (event.target.value == "...") {
        this.resetvalue();
      } else {
        this.allMatieres.forEach(matiere => {
          if (matiere.libelle == event.target.value) {
            this.matiere.libelle = matiere.libelle;
            this.matiere.idMatiere = matiere.id;
            this.matiere.numero = matiere.numero;
            this.matiere.coefficient = matiere.coefficient;
          }
        });
      }
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
      this.isIdProf = false;
      this.matieres.forEach(matiere => {
        if (matiere.id == this.currentMatiere[1]) {
          this.matiere.libelle = matiere.libelle;
          this.matiere.idMatiere = matiere.id;
          this.matiere.numero = matiere.numero;
          this.matiere.coefficient = matiere.coefficient;
        }
      });
      this.Save();
      // console.log(this.matiere);
    },
    resetvalue() {
      this.matiere.idMatiere = 0;
      this.matiere.libelle = "";
      this.matiere.numero = "";
      this.matiere.coefficient = "";
    },
    Save() {
      let idProf = this.isIdProf ? (idProf = +this.$route.params.id) : null;

      console.log(idProf);
      var data = {
        libelle: this.matiere.libelle,
        numero: this.matiere.numero,
        coefficient: this.matiere.coefficient,
        professeur_id: idProf
      };
      MatiereDataService.update(this.matiere.idMatiere, data)
        .then(response => {
          const message = this.isIdProf
            ? "Ajout d'un matiere  avec succée"
            : "Suppression d'un matiere  avec succée";
          this.$store.dispatch("addToFavorites", {
            status: true,
            message: message,
            nameIcon: "SuccessIcon.png",
            success: true
          });
          this.retrieveProfesseur();
          this.isAdd = false;
          this.isDelete = false;
          this.isIdProf = true;
          this.resetvalue();
        })
        .catch(e => {
          console.log(e);
        });
    },
    Cancel() {
      this.isAdd = false;
    }
  },
  filters: {
    capitalizeName: function(value) {
      value = value.toString();
      return value.toUpperCase();
    }
  },
  mounted() {
    // console.log("Get params : ", +this.$route.params.id);
    this.retrieveProfesseur();
  }
};
</script>
