/** * Created by vouill on 11/13/17. */

<template>
  <div class="div-register d-flex">
    <div><img src="../../assets/sec1.png" width="280px" height="100%" /></div>
    <form class="register flex-grow-1" @submit.prevent="register">
      <h1>S'enregistrer</h1>
      <label for="exampleFormControlInput1" class="form-label"
        >Nom d'utilsateur</label
      >
      <input
        required
        v-model="username"
        type="text"
        placeholder="Snoopy"
        class="form-control"
        id="exampleFormControlInput1"
      />
      <label class="form-label">Mot de passe</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
        class="form-control"
      />
      <label class="form-label">Confirmation Mot de passe</label>
      <input
        required
        v-model="conf_password"
        type="password"
        placeholder="Confirme mot de passe"
        class="form-control"
      />
      <hr />
      <button type="submit" class="btn btn-danger">Enregistrer</button>
    </form>
  </div>
</template>

<style>
.div-register {
  position: relative;
  border: 1px solid #d3cfcf3b;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.register {
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 10px;
}
</style>

<script>
import { AUTH_REQUEST } from "actions/auth";

export default {
  name: "register",
  data() {
    return {
      username: "dogo",
      password: "dogy",
      conf_password: ""
    };
  },
  methods: {
    register: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
