<template>
  <b-navbar class="header">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h5>Appointment system</h5>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="/">
        Appointments
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/employees' }">
        Documentation
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
        <div v-if="username">
          <b-icon
            icon="account"
            class="me-2"
          >
          </b-icon>
          <span style="font-size: large">{{ username }}</span>
          <b-icon
              icon="logout"
              class="ms-3 link"
              v-on:click="username = undefined, accountService.logout()"
          >
          </b-icon>
        </div>
        <div v-else>
          <button class="btn btn-primary">Login</button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import {MDBIcon} from "mdb-vue-ui-kit";
import {Constants} from "../../models/constants";
import {AccountService} from "../../services/account.service";

export default {
  data() {
    return {
      username: Constants.userInfo?.username,
      accountService: AccountService
    }
  },
  components: {
    MDBIcon
  },
  methods: {
  }
};
</script>

<style scoped>
.header {
  background-color: #d0bdf4;
}
</style>