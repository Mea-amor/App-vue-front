/** * Created by vouill on 11/13/17. */

<template>
  <div class="div-register d-flex">
    <div><img src="../../assets/sec1.png" width="280px" height="100%" /></div>
    <form class="register flex-grow-1" @submit.prevent="register">
      <h1>S'enregistrer</h1>
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
import http from "../../utils/http-common";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      conf_password: ""
    };
  },
  methods: {
    register: async function() {
      const { username, password, conf_password } = this;
      const postData = {
        email: username,
        password: password,
        c_password: conf_password
      };
      if (postData.password != postData.c_password) return;
      else {
        try {
          console.log("Active");
          const res = await http.post("/register", postData);
          console.log("Not Active");

          // const result = {
          //   status: res.status + "-" + res.statusText,
          //   headers: res.headers,
          //   data: res.data
          // };
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
