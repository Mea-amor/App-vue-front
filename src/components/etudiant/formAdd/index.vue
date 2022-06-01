<template>
  <div class="backform">
    <form class="login login-add" @submit.prevent="addAndUpdEtudiant">
      <h1>{{ nametitle }} d'un etudiant</h1>
      <label for="exampleFormControlInput1" class="form-label"
        >Numero etudiant</label
      >
      <input
        required
        v-model="numero"
        type="text"
        placeholder="Numero etudiant"
        class="form-control"
        id="exampleFormControlInput1"
      />
      <label class="form-label">Nom etudiant</label>
      <input
        required
        v-model="name"
        type="text"
        placeholder="Nom etudiant"
        class="form-control"
      />
      <label class="form-label">sexe</label>
      <select
        class="form-select"
        v-model="sexe"
        aria-label="Default select example"
      >
        <option disabled value="">...</option>
        <option value="masculin">Masculin</option>
        <option value="feminin">Feminin</option>
      </select>

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
import EtudiantDataService from "../../../api/EtudiantDataService";

export default {
  props: {
    etudiants: Array,
    currentIndex: Array
  },
  name: "addEtudiant",
  data() {
    return {
      name: "",
      numero: "",
      sexe: "",
      namebtn: "Enregistrer",
      nametitle: ""
    };
  },
  methods: {
    addAndUpdEtudiant: async function() {
      const { name, numero, sexe } = this;
      var data = {
        name: name,
        numero: numero,
        sexe: sexe,
        img: "testimg"
      };
      if (this.nametitle === "Modication") {
        EtudiantDataService.update(this.currentIndex[1], data)
          .then(response => {
            console.log(response.data.data);
            this.etudiants.splice(this.currentIndex[0], 1, response.data.data);
            this.$store.dispatch("addToFavorites", {
              status: true,
              message: "Modification etudiant avec succée",
              nameIcon: "SuccessIcon.png",
              success: true
            });
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        // console.log("add modif");

        EtudiantDataService.create(data)
          .then(response => {
            this.$store.dispatch("addToFavorites", {
              status: true,
              message: "Ajout etudiant avec succée",
              nameIcon: "SuccessIcon.png",
              success: true
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.$emit("newValue", true);
    },

    cancel: function() {
      this.$emit("newValue", false);
    }
  },
  mounted() {
    if (this.currentIndex) {
      const found = this.etudiants.find(
        element => element.id === this.currentIndex[1]
      );
      this.name = found.name;
      this.numero = found.numero;
      this.sexe = found.sexe;
      this.namebtn = "Modifier";
      this.nametitle = "Modication";
    } else {
      this.namebtn = "Enregistrer";
      this.nametitle = "Ajout";
      // console.log("monted this : ", this.currentIndex);
    }
  }
};
</script>
