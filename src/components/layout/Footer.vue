<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p class="mb-0">&copy; {{ currentYear }} Appointment system</p>
    </div>
  </footer>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class Footer extends Vue {
  currentYear: number = new Date().getFullYear();
}
</script>

<style scoped>
footer {
  height: 5em;
  background-color: #d0bdf4;
}
</style>
