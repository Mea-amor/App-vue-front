<template>
  <div class="d-flex test-alert">
    <span>test</span>
    <p>x</p>
  </div>
</template>
<script>
export default {
  name: "notify",
  data() {
    return {
      username: "",
      password: "",
      Invalid: false
    };
  }
};
</script>
<style>
.test-alert {
  width: 40%;
  background: #cb131352;
  padding: 12px;
  border-radius: 6px;
  position: absolute;
  z-index: 12;
  bottom: 16px;
  right: 20px;
}
</style>
