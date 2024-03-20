<template>
  <div class="container is-fluid mt-4 mb-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3 class="title mb-0 is-3">Appointments list</h3>
      <button class="btn btn-success">Add new</button>
    </div>
    <div v-if="appointments.length > 0" class="row mb-4">
      <div class="col-sm-12 col-md-6 col-lg-4 col-4 pb-3 ps-0 pe-3" v-for="appointment of appointments">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <p>
                <span class="title is-6">Client:</span>
                <span class="ms-2 card-data-value font-bolder">{{ appointment.customer.fullname }}</span>
              </p>
              <p>
                <span class="title is-6">Doctor:</span>
                <span class="ms-2 card-data-value font-bolder">{{ appointment.employee.fullname }}</span>
              </p>
              <p class="card-data-value">
                <b-icon
                    icon="calendar-clock"
                    class="me-2"
                >
                </b-icon>
                {{ new Date(appointment.date).toLocaleDateString() }} {{ appointment.start }} - {{ appointment.end }}
              </p>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">
              <b-icon
                  icon="pencil"
                  class="me-2"
              >
              </b-icon>
              Edit
            </a>
            <a href="#" class="card-footer-item">
              <b-icon
                  icon="delete"
                  class="me-2"
              >
              </b-icon>
              Delete
            </a>
          </footer>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <b-pagination
        :total="paginationInfo.totalItems"
        v-model="paginationInfo.pageNumber"
        :per-page="pageSize"
        :simple="false"
        :rounded="true"
        :icon-prev="'chevron-left'"
        :icon-next="'chevron-right'"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      />
    </div>
  </div>
  <b-loading v-model="isLoading"></b-loading>
</template>

<script lang="ts">
import {Appointment} from "../models/appointment.model";
import {AppointmentService} from "../services/appointment.service";
import {PaginationInfo} from "../models/pagination";

export default {
  data() {
    return {
      appointments: [] as Appointment[],
      isLoading: true,
      paginationInfo: new PaginationInfo()
    }
  },
  methods: {
    getData() {
      const appointmentService = new AppointmentService();
      appointmentService.getPage(this.pageNumber).then((res) => {
        this.paginationInfo = res.data as PaginationInfo;
        this.appointments = res.data.model;
        for (let i = 0; i < 9; i++) {
          this.appointments.push(this.appointments[0]);
        }
        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    pageSize(): number {
      return this.$store.getters.getPageSize;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
</style>
