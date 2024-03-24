<template>
  <Header v-if="userInfo" class="w-100"/>
  <router-view/>
  <Footer v-if="userInfo" class="w-100"/>
</template>
<script lang="ts">

import {UserInfo} from "./models/account.model";
import {JwtService} from "./services/jwt.service";
import {Options, Vue} from "vue-class-component";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

@Options({
  components: {Footer, Header},
  computed: {
    userInfo (): UserInfo | undefined {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    this.$store.commit('setUserInfo', JwtService.getCurrentUserInfo());
  }
})

export default class App extends Vue {}
</script>
<style scoped>
</style>
