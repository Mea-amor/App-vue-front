<template>
  <div
    class="d-flex  bg "
    v-bind:class="{
      'test-success': getnotify.success,
      'test-alert': !getnotify.success
    }"
  >
    <img
      :src="getImgUrl()"
      v-bind:alt="nameIcon"
      width="25px"
      style="margin: 0px 11px 0px 9px;"
    />
    <span class="flex-fill">{{ getnotify.message }}</span>
    <span class="btnClose" @click="closeNotif">x</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    message: String,
    nameIcon: String,
    success: Boolean
  },
  name: "notify",
  data() {
    return {
      messages: "deleteIcon.png"
    };
  },
  computed: {
    ...mapGetters(["getnotify"])
  },
  methods: {
    closeNotif() {
      this.$store.dispatch("addToFavorites", false);
    },
    getImgUrl() {
      return require("../../assets/IconNotify/" + this.getnotify.nameIcon);
    }
  }
};
</script>
<style>
.btnClose {
  font-size: 27px;
  position: relative;
  right: 8px;
  color: #a1a1a1;
  cursor: pointer;
}
.d-flex {
  align-items: center;
}

.bg {
  width: 40%;
  padding: 2px;
  border-radius: 2px;
  position: absolute;
  z-index: 12;
  bottom: 16px;
  right: 20px;
  border: 1px solid #0000001a;
  box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
    rgb(0 0 0 / 30%) 0px 1px 3px -1px;
}
.test-success {
  background: #13cb5f26;
  border-left: 5px solid #1d895d;
}
.test-alert {
  border-left: 5px solid #891d1d;
  background: #cb131326;
}

.border-left {
  border-left: solid #891d1d;
}
.border-left {
  border-left: solid #3a891d;
}
</style>
