<template>
  <div v-if="appointments.length > 0">
    <div v-for="appointment of appointments">
      <span>Date: {{ appointment.date }} ({{ appointment.start }} - {{ appointment.end }})</span>
    </div>
  </div>
  <b-loading v-model="isLoading"></b-loading>
</template>

<script lang="ts">
import {MDBIcon, MDBSpinner} from "mdb-vue-ui-kit";
import {Appointment} from "../models/appointment.model";
import {AppointmentService} from "../services/appointment.service";

export default {
  data() {
    return {
      appointments: [] as Appointment[],
      isLoading: true,
      pageNumber: 1
    }
  },
  components: {
    MDBIcon,
    MDBSpinner
  },
  methods: {
    getData() {
      const appointmentService = new AppointmentService();
      appointmentService.getPage(this.pageNumber).then((res) => {
        this.appointments = res.data.model;
        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
</style>
