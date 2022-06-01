<style>
@import "./css/prof.css";
</style>
<template>
  <div class="bgBack">
    <div class="content-data">
      <div class="closeProf" @click="$router.push('/matiere')">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
      <notify-delete
        v-if="isDelete"
        @deleteToogle="toggleDelete"
        @confirmToogle="destroyOne"
        value="matiere"
      />
      <!-- <div class="bg-form" v-if="isAdd">
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

      <div class="add-btn" @click="showAdd()">
        +
      </div> -->
      <div class="part-1">
        <div class="part-1-a">
          <div class="round" style="background: #afb553">
            {{ matiere.libelle[0].toUpperCase()
            }}{{ matiere.libelle[1].toUpperCase() }}
          </div>
        </div>
        <div class="part-1-b">
          <p>{{ matiere.libelle | capitalizeName }}</p>
          <p>NUM : {{ matiere.numero }}</p>
          <p>COEFFICIENT : {{ matiere.coefficient }}</p>
        </div>
      </div>
      <div class="data-2-link">
        <div
          class="link1"
          @click="showEtudiant()"
          :class="{ 'bg-link': isEtudiant }"
        >
          LISTE ETUDIANT
        </div>
        <div
          class="link2"
          @click="showProf()"
          :class="{ 'bg-link': isProfesseur }"
        >
          PROFESSEUR
        </div>
      </div>
      <div class="part-2">
        <table class="table table-bordered" v-if="isEtudiant">
          <thead>
            <tr>
              <th>ID</th>
              <th>NUMERO</th>
              <th>NAME</th>
              <th>SEXE</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(etudiant, index) in etudiants"
              :key="index"
              @click="toggleDelete(index, etudiant.id)"
            >
              <th scope="row">{{ etudiant.id }}</th>
              <td>{{ etudiant.numero }}</td>
              <td>{{ etudiant.name }}</td>
              <td>{{ etudiant.sexe }}</td>
            </tr>
            <tr v-if="!etudiants.length">
              <td colspan="4" style="    height: 70px;text-align: center;">
                Pas des données
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-bordered" v-if="isProfesseur">
          <thead>
            <tr>
              <th>ID</th>
              <th>NUMERO</th>
              <th>NAME</th>
              <th>CATEGORIE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{{ professeur.id }}</th>
              <td>{{ professeur.numero }}</td>
              <td>{{ professeur.name }}</td>
              <td>{{ professeur.categorie }}</td>
            </tr>
            <tr v-if="!professeur.id">
              <td colspan="4" style="    height: 70px;text-align: center;">
                Pas des données
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
  name: "relationMatiere",
  data: function() {
    return {
      value: "",
      currentEtudiant: [],
      etudiants: [],
      matiere: {},
      professeur: {},
      allMatieres: [],
      isIdEtudiant: true,
      isDelete: false,
      isAdd: false,
      matieredetaile: {
        idMatiere: 0,
        libelle: "",
        numero: "",
        coefficient: ""
      },
      isEtudiant: true,
      isProfesseur: false
    };
  },
  methods: {
    getRequestParams() {
      let params = {};
      params["page"] = 1;
      params["per_page"] = 50;
      return params;
    },
    retrieveMatiere() {
      let params = this.getRequestParams();
      let id = +this.$route.params.id;
      MatiereDataService.get(id)
        .then(response => {
          console.log(response);
          this.etudiants = response.data.data[1];
          this.matiere = response.data.data[0];
          if (this.matiere.professeur_id) {
            ProfesseurDataService.get(this.matiere.professeur_id)
              .then(response => {
                this.professeur = response.data.data[0];
                console.log(this.professeur);
              })
              .catch(e => {
                console.log(e);
              });
          }
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
            this.matieredetaile.libelle = matiere.libelle;
            this.matieredetaile.idMatiere = matiere.id;
            this.matieredetaile.numero = matiere.numero;
            this.matieredetaile.coefficient = matiere.coefficient;
          }
        });
      }
    },
    toggleDelete(index, matiereId) {
      if (this.isDelete) {
        this.isDelete = false;
      } else {
        this.isDelete = true;
        this.currentEtudiant[0] = index;
        this.currentEtudiant[1] = matiereId;
      }
    },
    destroyOne() {
      this.isIdEtudiant = false;
      this.etudiants.forEach(matiere => {
        if (matiere.id == this.currentEtudiant[1]) {
          this.matieredetaile.libelle = matiere.libelle;
          this.matieredetaile.idMatiere = matiere.id;
          this.matieredetaile.numero = matiere.numero;
          this.matieredetaile.coefficient = matiere.coefficient;
        }
      });
      this.Save();
      // console.log(this.matiere);
    },
    resetvalue() {
      this.matieredetaile.idMatiere = 0;
      this.matieredetaile.libelle = "";
      this.matieredetaile.numero = "";
      this.matieredetaile.coefficient = "";
    },
    Save() {
      let idEtudiant = this.$route.params.id;
      var data = {
        libelle: this.matieredetaile.libelle,
        numero: this.matieredetaile.numero,
        coefficient: this.matieredetaile.coefficient,
        etudiant_id: idEtudiant,
        remove: this.isIdEtudiant
      };
      MatiereDataService.update(this.matieredetaile.idMatiere, data)
        .then(response => {
          const message = this.isIdEtudiant
            ? "Ajout d'un matiere  avec succée"
            : "Suppression d'un matiere  avec succée";
          this.$store.dispatch("addToFavorites", {
            status: true,
            message: message,
            nameIcon: "SuccessIcon.png",
            success: true
          });
          this.retrieveMatiere();
          this.isAdd = false;
          this.isDelete = false;
          this.isIdEtudiant = true;
          this.resetvalue();
        })
        .catch(e => {
          console.log(e);
        });
    },
    Cancel() {
      this.isAdd = false;
    },
    showEtudiant() {
      this.isProfesseur = false;
      this.isEtudiant = true;
    },
    showProf() {
      this.isProfesseur = true;
      this.isEtudiant = false;
    }
  },
  computed: {
    firstLetter() {
      return this.matiere.name[0].toUpperCase();
    }
  },
  filters: {
    capitalizeName: function(value) {
      return value.toUpperCase();
    }
  },
  mounted() {
    this.retrieveMatiere();
  }
};
</script>
