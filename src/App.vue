<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <Header v-if="userInfo" class="w-100"/>
  <router-view/>
  <Footer v-if="userInfo" class="w-100"/>
</template>
<script lang="ts">

import {UserInfo} from "./models/account.model";
import {JwtService} from "./services/jwt.service";

export default {
  data() {
  },
  computed: {
    userInfo (): UserInfo | undefined {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    this.$store.commit('setUserInfo', JwtService.getCurrentUserInfo());
  }
}
</script>
<style scoped>
</style>
