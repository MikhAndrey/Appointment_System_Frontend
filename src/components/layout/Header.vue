<template>
  <b-navbar class="header">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h5>Appointment system</h5>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Appointments
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/employees' }">
        Employees
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/customers' }">
        Customers
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/departments' }">
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
import {AccountService} from "../../services/account.service";
import router from "../../router";
import {UserInfo} from "../../models/userInfo";

export default {
  data() {
    return {
      accountService: new AccountService()
    }
  },
  computed: {
    userInfo(): UserInfo | undefined {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    logout() {
      this.$store.commit('setUserInfo', undefined);
      this.accountService.logout();
      router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #d0bdf4;
}
</style>
