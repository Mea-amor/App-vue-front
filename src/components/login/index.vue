/** * Created by vouill on 11/13/17. */

<template>
  <div
    class="div-login d-flex"
    style="    position: absolute;
    top: 192px;
    left: 239px;background: #ffffff;"
  >
    <div class="bg-loading bg-loading-color" v-if="isLoading">
      <loading />
    </div>
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
      <div
        style="display: flex;
    justify-content: flex-end;    gap: 10px;"
      >
        <button type="submit" class="btn btn-success" style="flex-grow: 1;">
          Se connecter
        </button>
        <button
          type="buton"
          class="btn btn-danger"
          @click="$emit('closeDiv', true)"
          style="flex-grow: 1;"
        >
          Annuler
        </button>
      </div>
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
.bg-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.bg-loading-color {
  background: #181e1c21;
}
</style>

<script>
// eslint-disable-next-line no-unused-vars
import { AUTH_REQUEST } from "actions/auth";
import http from "../../utils/http-common";
import Loading from "../loading";

export default {
  components: { Loading },
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      Invalid: false,
      isLoading: false
    };
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    login: async function() {
      this.isLoading = true;
      const { username, password } = this;
      const postData = {
        email: username,
        password: password
      };

      try {
        const res = await http.post("/login", postData);
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data.data
        };
        if (result.data.token) {
          localStorage.setItem("user", JSON.stringify(result.data));
        }
        this.Invalid = false;
        this.$store.dispatch("addToFavorites", {
          status: true,
          message: "Vous ête maintenant connecté",
          nameIcon: "SuccessIcon.png",
          success: true
        });
        this.clearPostOutput();
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.Invalid = true;
        this.isLoading = false;
      }
    },

    clearPostOutput() {
      this.username = "";
      this.password = "";
    }
  }
};
</script>
