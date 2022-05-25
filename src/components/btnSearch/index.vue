<style>
@import "./css/btnSearch.css";
.iconGlobal {
  background: #377c4c73;
  padding: 0px 5px;
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 13%) 0px 0px 1px 1px;
  cursor: pointer;
}
</style>
<template>
  <div class="d-flex position-relative mt-1 ">
    <input type="text" placeholder="recherche par nom" id="customInput" />
    <div class="position-absolute end-0">
      <button class="btnParent btnOk">
        <font-awesome-icon icon="fa-solid fa-check" style="color: #1f3a24;" />
      </button>
      <button class="btnParent btnInfo ms-1 me-1" @click="toogleUtil">
        <font-awesome-icon icon="fa-solid fa-gear" style="color: #273835a6;" />
      </button>
    </div>
    <div class="listUtils" v-if="isListUtils">
      <span class="iconGlobal" v-b-tooltip.hover title="Par numero">
        <font-awesome-icon
          icon="fa-solid fa-user"
          style="color: rgb(61 137 75);"
        />
      </span>
      <span class="iconGlobal" v-b-tooltip.hover title="Par nom">
        <font-awesome-icon
          icon="fa-solid fa-address-book"
          style="color: rgb(61 137 75);"
        />
      </span>
      <span class="iconGlobal" v-b-tooltip.hover title="Par sexe">
        <font-awesome-icon
          icon="fa-solid fa-address-card"
          style="color: rgb(61 137 75);"
        />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "btnSearch",
  data: function() {
    return {
      isListUtils: false
    };
  },
  methods: {
    toogleUtil() {
      if (this.isListUtils) this.isListUtils = false;
      else this.isListUtils = true;
    }
  }
};
</script>
