<style>
@import "../../assets/styles/loading.css";

.bg-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background: #ffffff21;
}
</style>
<template>
  <div class="bg-loading">
    <div class="lds-dual-ring"></div></div
></template>
<script>
export default {
  name: "loadingComponent"
};
</script>
