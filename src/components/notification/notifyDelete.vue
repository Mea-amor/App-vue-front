<template>
  <div class="bg-notifDel">
    <div class="div-contenue">
      <h4 class="text-color">Suppression</h4>
      <p>
        Voullez-vous vraiment supprimer cet etudiant ?
      </p>
      <div class="div-btn">
        <button class="cancel-btn" @click="toogleDelete">
          Annuler
        </button>
        <button class="confirme-btn">Confirmer</button>
      </div>
    </div>
  </div>
</template>
<script>
// import
export default {
  name: "notifyDelete",
  data: function() {
    return {
      message: "test"
    };
  },
  methods: {
    toogleDelete() {
      this.$emit("deleteToogle");
    }
  }
};
</script>
<style>
@import "../../assets/styles/notify/notifyDelete.scss";
</style>
