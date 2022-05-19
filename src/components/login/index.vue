/** * Created by vouill on 11/13/17. */

<template>
  <div class="div-login d-flex">
    <div><img src="../../assets/sec1.png" width="280px" /></div>
    <form class="login flex-grow-1" @submit.prevent="login">
      <h1>Se connecter</h1>
      <label for="exampleFormControlInput1" class="form-label"
        >Email de l'utilsateur</label
      >
      <input
        required
        v-model="username"
        type="text"
        placeholder="exemple@gmail.com"
        class="form-control"
        id="exampleFormControlInput1"
      />
      <label class="form-label">Mot de passe</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="form-control"
      />
      <div class="text-danger " v-if="Invalid">
        Email ou mot de passe invalide
      </div>
      <hr />
      <button type="submit" class="btn btn-success">Se connecter</button>
    </form>
  </div>
</template>

<style>
.div-login {
  position: relative;
  border: 1px solid #d3cfcf3b;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.login {
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 10px;
}
.alertm {
  padding: 0;
  margin-bottom: 0;
}
.alert-danger {
  background-color: none;
  border-color: none;
}
</style>

<script>
// eslint-disable-next-line no-unused-vars
import { AUTH_REQUEST } from "actions/auth";
import http from "../../utils/http-common";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      Invalid: false
    };
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    login: async function() {
      const { username, password } = this;
      const postData = {
        email: username,
        password: password
      };

      try {
        console.log("Active");
        const res = await http.post("/login", postData);
        console.log("Not Active");

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data.data
        };
        if (result.data.token) {
          localStorage.setItem("user", JSON.stringify(result.data));
        }
        console.log(result);
        this.Invalid = false;
      } catch (err) {
        console.log(err);
        this.Invalid = true;
      }
    },

    clearPostOutput() {}
  }
};
</script>
