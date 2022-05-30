<template>
  <div class="bg-notifDel">
    <div class="div-contenue">
      <h4 class="text-color">Suppression</h4>
      <p>Voullez-vous vraiment supprimer {{ value | letterGenre }} ?</p>
      <div class="div-btn">
        <button class="cancel-btn" @click="toogleDelete">
          Annuler
        </button>
        <button class="confirme-btn" @click="toogleConfirm">Confirmer</button>
      </div>
    </div>
  </div>
</template>
<script>
// import
export default {
  props: {
    value: String
  },
  name: "notifyDelete",
  data: function() {
    return {
      message: "test"
    };
  },
  filters: {
    letterGenre: function(value) {
      if (value == "professeur") return "ce professeur";
      if (value == "matiere") return "cette matiere";
      if (value == "etudiant") return "cet etudiant";
    }
  },
  methods: {
    toogleDelete() {
      this.$emit("deleteToogle");
    },
    toogleConfirm() {
      this.$emit("confirmToogle");
    }
  }
};
</script>
<style>
@import "../../assets/styles/notify/notifyDelete.scss";
</style>
