<template>
  <div class="container d-flex align-items-center">
    <div class="box d-flex align-items-center login-bg">
      <div class="columns mb-4">
        <div class="column">
          <h3 class="title is-3 text-center">Login</h3>
          <form v-on:submit="login()">
            <b-field label="Username">
              <b-input
                  v-model.trim="model.username"
                  required
                  validation-message="Enter your username"
              ></b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                  type="password"
                  v-model="model.password"
                  required
                  validation-message="Enter your password"
                  password-reveal
              >
              </b-input>
            </b-field>
            <button class="btn btn-primary w-50" type="submit">Send</button>
          </form>
        </div>
        <div class="column d-flex align-items-center">
          <img src="/src/assets/login-image.jpg" class="card img-fluid"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {AccountService} from "../services/account.service";
import {LoginModel} from "../models/account.model";
import {JwtService} from "../services/jwt.service";
import router from "../router";
import {UserInfo} from "../models/userInfo";

export default {
  data() {
    return {
      model: new LoginModel(),
      accountService: new AccountService()
    }
  },
  methods: {
    login() {
      this.accountService.login(this.model).then((res: any) => {
        JwtService.setTokens(res.data);
        this.$store.commit('setUserInfo', JwtService.getParsedTokenInfo());
        router.push({ name: "home" });
      }).catch((err: any) => {
        alert(err);
      });
    }
  },
  computed: {
    userInfo(): UserInfo | undefined {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    if (this.userInfo) {
      router.go(-1);
    }
  }
};
</script>

<style scoped>
.login-bg {
  background-color: #e5eaf5;
}
</style>
