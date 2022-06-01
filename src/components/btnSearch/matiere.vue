<style>
@import "./css/btnSearch.css";
@import "./css/animateBtn.css";
.iconGlobal {
  background: #377c4c73;
  padding: 0px 5px;
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 13%) 0px 0px 1px 1px;
  cursor: pointer;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.listUtils span:hover {
  position: relative;
  top: -4px;
  transition: all 1s cubic-bezier(0.43, 1.1, 0.62, 1.08);
}
</style>
<template>
  <div class="d-flex position-relative mt-1 ">
    <input
      ref="input"
      type="text"
      placeholder="Recherche par nom"
      id="customInput"
      v-model="value"
      @keyup.enter="$emit('searchValue', typeSearch, value)"
    />
    <div class="position-absolute end-0">
      <button
        class="btnParent btnOk"
        @click="$emit('searchValue', typeSearch, value)"
      >
        <font-awesome-icon icon="fa-solid fa-check" style="color: #1f3a24;" />
      </button>
      <button
        class="btnParent  ms-1 me-1"
        :class="{ btnInfo: !showFont, btndanger: showFont }"
      >
        <font-awesome-icon
          icon="fa-solid fa-gear"
          style="color: #273835a6;"
          v-if="showFont == ''"
          @click="toogleUtil"
        />
        <font-awesome-icon
          icon="fa-solid fa-stop"
          style="color: #b11c1c82;"
          v-if="showFont != ''"
          @click="resetValue()"
        />
      </button>
    </div>
    <div>
      <transition name="slide-fade">
        <div class="listUtils" v-if="isListUtils">
          <span
            class="iconGlobal"
            v-b-tooltip.hover
            title="Par numero"
            @click="changetype('numero')"
          >
            <font-awesome-icon
              icon="fa-solid fa-user"
              style="color: rgb(61 137 75);"
            />
          </span>
          <span
            class="iconGlobal"
            v-b-tooltip.hover
            title="Par nom"
            @click="changetype('libelle')"
          >
            <font-awesome-icon
              icon="fa-solid fa-address-book"
              style="color: rgb(61 137 75);"
            />
          </span>
          <span
            class="iconGlobal"
            v-b-tooltip.hover
            title="Par coefficient"
            @click="changetype('coefficient')"
          >
            <font-awesome-icon
              icon="fa-solid fa-address-card"
              style="color: rgb(61 137 75);"
            />
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    filterType: String
  },

  name: "btnSearchMatiere",
  data: function() {
    return {
      isListUtils: false,
      typeSearch: "libelle",
      value: ""
    };
  },
  computed: {
    showFont() {
      return this.value;
    }
  },
  methods: {
    toogleUtil() {
      if (this.isListUtils) this.isListUtils = false;
      else this.isListUtils = true;
    },
    changetype(type) {
      this.typeSearch = type;
      this.$refs.input.placeholder = "Recherche par " + this.typeSearch;
      this.value = "";
      this.isListUtils = false;
    },
    resetValue() {
      this.value = "";
      this.$emit("resetValue");
    }
  }
};
</script>
