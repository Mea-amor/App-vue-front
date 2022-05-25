<template>
  <div class="backform">
    <form class="login login-add" @submit.prevent="addAndUpdProfesseur">
      <h1>{{ nametitle }} d'un professeur</h1>
      <label for="exampleFormControlInput1" class="form-label"
        >Numero professeur</label
      >
      <input
        required
        v-model="numero"
        type="text"
        placeholder="Numero professeur"
        class="form-control"
        id="exampleFormControlInput1"
      />
      <label class="form-label">Nom professeur</label>
      <input
        required
        v-model="name"
        type="text"
        placeholder="Nom professeur"
        class="form-control"
      />
      <label class="form-label">categorie</label>
      <select
        class="form-select"
        v-model="categorie"
        aria-label="Default select example"
      >
        <option disabled value="">...</option>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
      <!-- <div class="text-danger " v-if="Invalid">
        Email ou mot de passe invalide
      </div> -->
      <hr />
      <div class="d-flex">
        <button type="submit" class="btn btn-success flex-fill">
          {{ namebtn }}
        </button>
        <button @click="cancel" type="reset" class="btn btn-danger flex-fill">
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>
<style>
.login-add {
  background: white;
  border: 1px solid #0000002e;
  top: 70px;
  position: relative;
  width: 680px;
}
.backform {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import ProfesseurDataService from "../../../api/ProfesseurDataService";

export default {
  props: {
    professeurs: Array,
    currentIndex: Array
  },
  name: "addProfesseur",
  data() {
    return {
      name: "",
      numero: "",
      categorie: "",
      namebtn: "Enregistrer",
      nametitle: ""
    };
  },
  methods: {
    addAndUpdProfesseur: async function() {
      const { name, numero, categorie } = this;
      var data = {
        name: name,
        numero: numero,
        categorie: categorie
      };
      console.log(data, " in categorie");
      if (this.nametitle === "Modication") {
        ProfesseurDataService.update(this.currentIndex[1], data)
          .then(response => {
            console.log(response.data.data);
            this.professeurs.splice(
              this.currentIndex[0],
              1,
              response.data.data
            );
            this.$store.dispatch("addToFavorites", {
              status: true,
              message: "Modificatin Professeur avec succée",
              nameIcon: "SuccessIcon.png",
              success: true
            });
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        ProfesseurDataService.create(data)
          .then(response => {
            this.professeurs.push(response.data.data);
            this.$store.dispatch("addToFavorites", {
              status: true,
              message: "Ajout Professeur avec succée",
              nameIcon: "SuccessIcon.png",
              success: true
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.$emit("newValue", false);
      // this.$router.push("/professeur");
    },
    getByidEtudiant: async function() {},
    cancel: function() {
      this.$emit("newValue", false);
    }
  },
  mounted() {
    if (this.currentIndex) {
      const found = this.professeurs.find(
        element => element.id === this.currentIndex[1]
      );
      this.name = found.name;
      this.numero = found.numero;
      this.categorie = found.categorie;
      this.namebtn = "Modifier";
      this.nametitle = "Modication";
    } else {
      this.namebtn = "Enregistrer";
      this.nametitle = "Ajout";
      console.log("monted this : ", this.currentIndex);
    }
  }
};
</script>
