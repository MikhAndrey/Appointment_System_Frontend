<template>
  <b-navbar class="header">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h5>Appointment system</h5>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Main page
      </b-navbar-item>
      <b-navbar-item 
        v-if="hasPermission('view_employee')" 
        tag="router-link" :to="{ path: '/employees' }"
      >
        Employees
      </b-navbar-item>
      <b-navbar-item
        v-if="hasPermission('view_customer')"
        tag="router-link" :to="{ path: '/customers' }"
      >
        Customers
      </b-navbar-item>
      <b-navbar-item
        v-if="hasPermission('view_department')"
        tag="router-link" :to="{ path: '/departments' }"
      >
        Departments
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div v-if="userInfo?.username">
          <b-icon
            icon="account"
            class="me-2"
          >
          </b-icon>
          <span style="font-size: large">{{ userInfo?.username }}</span>
          <b-icon
              icon="logout"
              class="ms-3 link"
              v-on:click="logout()"
          >
          </b-icon>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import {AccountService} from "@/services/account.service";
import router from "../../router";
import {UserInfo} from "@/models/account.model";
import {JwtService} from "@/services/jwt.service";
import {Options, Vue} from "vue-class-component";

@Options ({
  computed: {
    userInfo(): UserInfo | undefined {
      return this.$store.getters.getUserInfo;
    },
    hasPermission(): (permission: string) => any {
      return (permissionName: string) => this.$store.getters.isInPermission(permissionName);
    }
  },
  methods: {
    logout() {
      this.$store.commit('setUserInfo', undefined);
      this.accountService.logout().then(() => {
        JwtService.removeTokens();
      }).catch((err: any) => {
        for (let prop in err.response.data) {
          this.$buefy.toast.open({
            duration: 3000,
            message: err.response.data[prop],
            type: 'is-danger'
          });
        }
      });
      router.push({ name: "login" });
    }
  }
})

export default class Header extends Vue {
  accountService: AccountService = new AccountService();
}
</script>

<style scoped>
.header {
  background-color: #d0bdf4;
}
</style>
