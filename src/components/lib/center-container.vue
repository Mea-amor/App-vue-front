/** * Created by vouill on 11/14/17. */

<template>
  <div class="center-container" :class="{ center: noHome }">
    <sidebar v-if="currentRouteName != 'Home'" />
    <slot />
    <notify v-if="getnotify.status" />
    <span style="display:none">
      {{ myVal }}
      {{ stopNotify }}
    </span>
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.center {
  justify-content: center;
}
</style>

<script>
import Sidebar from "components/sidebar";
import Notify from "components/notification";
import { mapGetters } from "vuex";

export default {
  data: function() {
    return { noHome: false, ivl: 0, count: 1000, ctr: 0 };
  },
  components: {
    Sidebar,
    Notify
  },
  name: "center-container",

  computed: {
    ...mapGetters(["getnotify"]),
    currentRouteName() {
      if (this.$route.name === "Home") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.noHome = true;
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.noHome = false;
      }
      return this.$route.name;
    },
    myVal() {
      if (this.getnotify.status === true) {
        this.updateTimer();
      }
      return this.getnotify;
    },
    stopNotify() {
      if (this.ctr == 5) {
        clearInterval(this.ivl);
        this.$store.dispatch("addToFavorites", {
          status: false,
          message: "",
          nameIcon: "",
          success: true
        });
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ctr = 0;
      }
      return this.ctr;
    }
  },
  methods: {
    updateTimer() {
      console.log("test opda");
      this.ivl = setInterval(() => {
        this.ctr = this.ctr + 1;
      }, this.count);
    }
  }
};
</script>
