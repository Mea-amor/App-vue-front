<template>
  <div class="backform">
    <form class="login login-add" @submit.prevent="addAndUpdMatiere">
      <h1>{{ nametitle }} d'un matiere</h1>
      <label for="exampleFormControlInput1" class="form-label"
        >Numero matiere</label
      >
      <input
        required
        v-model="numero"
        type="text"
        placeholder="Numero matiere"
        class="form-control"
        id="exampleFormControlInput1"
      />
      <label class="form-label">Libelle matiere</label>
      <input
        required
        v-model="libelle"
        type="text"
        placeholder="Nom matiere"
        class="form-control"
      />
      <label class="form-label">coefficient</label>
      <input
        required
        v-model="coefficient"
        type="number"
        class="form-control"
      />

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
import MatiereDataService from "../../../api/MatiereDataService";

export default {
  props: {
    matieres: Array,
    currentIndex: Array
  },
  libelle: "addMatiere",
  data() {
    return {
      numero: "",
      libelle: "",
      namebtn: "Enregistrer",
      nametitle: "",
      coefficient: 0
    };
  },
  methods: {
    addAndUpdMatiere: async function() {
      const { libelle, numero, coefficient } = this;
      var data = {
        libelle: libelle,
        numero: numero,
        coefficient: coefficient
      };
      if (this.nametitle === "Modication") {
        MatiereDataService.update(this.currentIndex[1], data)
          .then(response => {
            // console.log(response.data.data);
            this.matieres.splice(this.currentIndex[0], 1, response.data.data);
            this.$store.dispatch("addToFavorites", {
              status: true,
              message: "Modification d'un matiere  avec succée",
              nameIcon: "SuccessIcon.png",
              success: true
            });
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        MatiereDataService.create(data)
          .then(response => {
            // this.matieres.push(response.data.data);
            this.$store.dispatch("addToFavorites", {
              status: true,
              message: "Ajout d'un matiere avec succée",
              nameIcon: "SuccessIcon.png",
              success: true
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.$emit("newValue", true);
      // this.$router.push("/matiere");
    },
    cancel: function() {
      this.$emit("newValue", false);
    }
  },
  mounted() {
    if (this.currentIndex) {
      const found = this.matieres.find(
        element => element.id === this.currentIndex[1]
      );
      this.libelle = found.libelle;
      this.numero = found.numero;
      this.coefficient = found.coefficient;
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
