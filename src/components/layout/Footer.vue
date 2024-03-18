<script setup>

</script>

<template>
  <footer class="d-flex align-items-center justify-content-center">
    <p class="mb-0">&copy; {{ currentYear }} Appointment system</p>
    <!-- Add other footer elements -->
  </footer>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
footer {
  height: 5em;
  background-color: #d0bdf4;
}
</style>
