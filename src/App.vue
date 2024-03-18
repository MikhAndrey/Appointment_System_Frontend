<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <Header class="w-100"/>
  <router-view/>
  <Footer class="w-100"/>
</template>
<script lang="ts">
import {JwtService} from "./services/jwt.service";
JwtService.initialize();
</script>
<style scoped>
</style>

