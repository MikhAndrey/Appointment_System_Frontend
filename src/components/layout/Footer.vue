<script setup>

</script>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p class="mb-0">&copy; {{ currentYear }} Appointment system</p>
    </div>
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
