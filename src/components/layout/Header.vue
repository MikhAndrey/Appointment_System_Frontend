<template>
  <header>
    <nav class="px-4 pt-3 d-flex justify-content-between align-items-center">
      <h5>Appointment system</h5>
      <div v-if="username">
        <MDBIcon icon="user" class="me-2"></MDBIcon>
        <span style="font-size: large">{{ username }}</span>
        <MDBIcon icon="sign-out-alt" role="button" v-on:click="username = undefined, accountService.logout()" class="ms-3"></MDBIcon>
      </div>
      <div v-else>
        <button class="btn btn-primary">Login</button>
      </div>
    </nav>
  </header>
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
header {
  height: 5em;
  background-color: #d0bdf4;
}
</style>