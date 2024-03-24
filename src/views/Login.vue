<template>
  <div class="container d-flex align-items-center">
    <div class="box d-flex align-items-center login-bg">
      <div class="columns mb-4">
        <div class="column">
          <h3 class="title is-3 text-center">Sign in</h3>
          <form @submit.prevent="login()">
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
            <button class="btn btn-primary w-50" type="submit">Login</button>
          </form>
        </div>
        <div class="column d-flex align-items-center">
          <img src="/login-image.jpg" alt="Login image" class="card img-fluid"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {AccountService} from "@/services/account.service";
import {LoginModel} from "@/models/account.model";
import {JwtService} from "@/services/jwt.service";
import router from "../router";
import {UserInfo} from "@/models/account.model";
import {Options, Vue} from "vue-class-component";

@Options ({
  methods: {
    login() {
      this.accountService.login(this.model).then((res: any) => {
        JwtService.setTokens(res.data);
        this.$store.commit('setUserInfo', JwtService.getCurrentUserInfo());
        router.push({ name: "home" });
      }).catch((err: any) => {
        for (let prop in err.response.data) {
          this.$buefy.toast.open({
            duration: 3000,
            message: err.response.data[prop],
            type: 'is-danger'
          });
        }
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
})

export default class Login extends Vue {
  model: LoginModel = new LoginModel();
  accountService: AccountService = new AccountService();
}
</script>

<style scoped>
.login-bg {
  background-color: #e5eaf5;
}
</style>
