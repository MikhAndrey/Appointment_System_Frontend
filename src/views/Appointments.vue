<template>
  <div class="container is-fluid mt-4 mb-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3 class="title mb-0 is-3">Appointments list</h3>
      <button
        class="btn btn-success"
        v-if="hasPermission('add_appointment')"
        @click="onAdd()"
      >Add new</button>
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
              <p>
                <b-icon
                    icon="calendar-clock"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ new Date(appointment.date).toLocaleDateString() }} {{ appointment.start }} - {{ appointment.end }}
                </span>
              </p>
            </div>
          </div>
          <footer 
            class="card-footer" 
            v-if="hasPermission('delete_appointment') || hasPermission('change_appointment')"
          >
            <a
              @click="onEdit(appointment)"
              class="card-footer-item"
              v-if="hasPermission('change_appointment')"
            >
              <b-icon icon="pencil" class="me-2"></b-icon>
              Edit
            </a>
            <a
              @click="onDelete(appointment.id)" 
              class="card-footer-item"
              v-if="hasPermission('delete_appointment')"
            >
              <b-icon icon="delete" class="me-2">
              </b-icon>
              Delete
            </a>
          </footer>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mb-4">
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
        @update:model-value="getData()"
      />
    </div>
  </div>
  <b-loading v-model="isLoading"></b-loading>
  <b-modal
    v-model="isModalOpened"
    has-modal-card
    trap-focus
    :destroy-on-hide="true"
    aria-role="dialog"
    aria-label="Appointment Modal"
    close-button-aria-label="Close"
    aria-modal
  >
    <template #default="props">
      <appointment-manage-modal
        class="actions-modal-mid"
        :appointment="actionsModel"
        :mode="manageMode"
        @close="props.close"
        @refresh-data="getData()"
      >
      </appointment-manage-modal>
    </template>
  </b-modal>
</template>

<script lang="ts">
import {Appointment, AppointmentCreate} from "../models/appointment.model";
import {AppointmentService} from "../services/appointment.service";
import {PaginationInfo} from "../models/pagination";
import {UserInfo} from "../models/account.model";
import {AccountService} from "../services/account.service";
import {AxiosResponse} from "axios";
import {PageResponse, Response} from "../models/response";
import AppointmentManageModal from "./AppointmentManageModal.vue";

export default {
  components: {
    AppointmentManageModal
  },
  data() {
    return {
      appointments: [] as Appointment[],
      actionsModel: new AppointmentCreate(),
      manageMode: "add" as "add" | "edit",
      accountService: new AccountService(),
      appointmentService: new AppointmentService(),
      isModalOpened: false,
      isLoading: true,
      paginationInfo: new PaginationInfo(),
      websocket: null
    }
  },
  methods: {
    getData() {
      this.isLoading = true;
      this.appointmentService.getPage(this.paginationInfo.pageNumber, this.pageSize).then(
        (res: AxiosResponse<PageResponse<Appointment[]>>) => {
          this.paginationInfo = res.data as PaginationInfo;
          this.appointments = res.data.model;
          this.isLoading = false;
        }).catch((err: any) => {
          this.isLoading = false;
        });
    },
    onAdd() {
      this.manageMode = "add";
      this.actionsModel = new AppointmentCreate();
      this.isModalOpened = true;
    },
    onEdit(appointment: Appointment) {
      this.manageMode = "edit";
      Object.assign(this.actionsModel, appointment);
      this.actionsModel.customerId = appointment.customer.id;
      this.actionsModel.employeeId = appointment.employee.id;
      
      this.isModalOpened = true;
    },
    onDelete(id: number) {
      this.$buefy.dialog.confirm({
        title: 'Delete appointment',
        message: "Are you sure you want to <b>delete</b> this appointment? This action can't be undone.",
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.appointmentService.delete(id).then((res: AxiosResponse<Response<any>>) => {
            this.$buefy.toast.open({
              duration: 3000,
              message: res.data.message,
              type: 'is-success'
            });
            this.getData();
          });
        }
      })
    },
    onSocketMessage(event: any) {
      const messageData: {data: any, type: string} = JSON.parse(event.data);
      switch (messageData.type) {
        case 'appointment.delete':
          this.appointments = this.appointments.filter((el: Appointment) => el.id !== messageData.data);
          break;
        case 'appointment.update':
          let updatedAppointment = this.appointments.find((el: Appointment) => el.id === messageData.data.id);
          Object.assign(updatedAppointment, messageData.data);
          break;
        case 'appointment.create':
          if (this.paginationInfo.pageNumber === this.paginationInfo.totalPages) {
            this.appointments.push(messageData.data);
          }
      }
    },
    onSocketError(error: any) {
      console.error(error);
    }
  },
  computed: {
    pageSize(): number {
      return this.$store.getters.getPageSize;
    },
    userInfo (): UserInfo | undefined {
      return this.$store.getters.getUserInfo;
    },
    hasPermission(): (permission: string) => any {
      return (permissionName: string) => this.$store.getters.isInPermission(permissionName);
    }
  },
  mounted() {
    this.getData();
    this.websocket = new WebSocket('ws://localhost:8000/ws/appointments/');
    this.websocket.onmessage = this.onSocketMessage;
    this.websocket.onerror = this.onSocketError;
  }
};
</script>

<style scoped>
</style>
