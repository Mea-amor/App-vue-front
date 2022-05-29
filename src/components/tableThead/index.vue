<template>
  <th scope="col">
    <div class="thC" @click="changeIconSort($event)">
      <span>
        {{ value }}
      </span>
      <font-awesome-icon
        icon="fa-solid fa-angle-down"
        style="color: #273835a6;"
        v-if="!type"
        @click="changeIconSort"
      />
      <font-awesome-icon
        icon="fa-solid fa-angle-up"
        style="color: #273835a6;"
        v-if="type"
        @click="changeIconSort"
      />
    </div>
  </th>
</template>
<script>
export default {
  name: "thtable",
  props: {
    value: String,
    type: Boolean
  },
  data: function() {
    return { nameIcon: "fa-solid fa-angle-down", types: "desc" };
  },
  methods: {
    changeIconSort() {
      // console.log(event.path[0].innerText, this.type);
      console.log("test");
      this.$emit("testValue");
    }
  }
};
</script>
i
