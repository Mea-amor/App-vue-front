/** * Created by vouill on 11/14/17. */

<template>
  <div class="center-container" :class="{ center: noHome }">
    <sidebar v-if="currentRouteName != 'Home'" />
    <slot />
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
export default {
  data: function() {
    return { noHome: false };
  },
  components: {
    Sidebar
  },
  name: "center-container",
  computed: {
    currentRouteName() {
      if (this.$route.name === "Home") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.noHome = true;
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.noHome = false;
      }
      return this.$route.name;
    }
  }
};
</script>
