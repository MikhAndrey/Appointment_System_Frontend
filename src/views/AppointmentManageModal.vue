<template>
  <form @submit="mode === 'add' ? onAdd() : onEdit()">
    <div class="modal-card w-auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ mode === "add" ? "Add" : "Edit" }} appointment</p>
        <button
          type="button"
          class="delete"
          @click="$emit('close')"
        />
      </header>
      <section class="modal-card-body">
        <b-field label="Appointment date">
          <b-datepicker v-model="date">
          </b-datepicker>
        </b-field>
        <b-field label="Appointment start time">
          <b-clockpicker
            v-model="startDate"  
            rounded
            icon="clock"
          >
          </b-clockpicker>
        </b-field>
        <b-field label="Appointment end time">
          <b-clockpicker
            v-model="endDate"
            rounded
            icon="clock"
          >
          </b-clockpicker>
        </b-field>
        <div class="d-flex">
          <b-field label="Customer">
            <b-select
              v-model="appointment.customerId"
            >
              <option v-for="customer in customers" :value="customer.id">{{ customer.fullname }}</option>
            </b-select>
          </b-field>
          <b-field label="Employee" class="ms-4">
            <b-select
              v-model="appointment.employeeId"
            >
              <option v-for="employee in employees" :value="employee.id">{{ employee.fullname }}</option>
            </b-select>
          </b-field>
        </div>
        <button
          type="submit"
          class="w-50 btn btn-primary"
        >Save</button>
      </section>
    </div>
  </form>
</template>
<script lang="ts">
import {Response} from "@/models/response";
import {EmployeeShortModel} from "@/models/employee.model";
import {EmployeeService} from "@/services/employee.service";
import {CustomerService} from "@/services/customer.service";
import {CustomerShortModel} from "@/models/customer.model";
import {Appointment, AppointmentCreate} from "@/models/appointment.model";
import {AppointmentService} from "@/services/appointment.service";
import {DateHelper} from "@/helpers/date-helper";
import {Options, Vue} from "vue-class-component";
import { AxiosResponse } from "axios";

@Options ({
  props: {
    appointment: AppointmentCreate,
    mode: "add" as "add" | "edit"
  },
  emits: ['close', 'refreshData'],
  methods: {
    getData() {
      this.customerService.getShortModelsList().then((res: AxiosResponse<Response<CustomerShortModel[]>>) => {
        this.customers = res.data.model;
      });
      this.employeeService.getShortModelsList().then((res: AxiosResponse<Response<EmployeeShortModel[]>>) => {
        this.employees = res.data.model;
        if (!this.appointment.employeeId) {
          this.appointment.employeeId = this.employees[0].id;
        }
        if (!this.appointment.customerId) {
          this.appointment.customerId = this.customers[0].id;
        }
      });
    },
    onAdd() {
      this.convertDatesToString();
      this.appointmentService.add(this.appointment).then((res: AxiosResponse<Response<Appointment>>) => {
        this.$buefy.toast.open({
          duration: 3000,
          message: res.data.message,
          type: 'is-success'
        });
        this.$emit('close');
        this.$emit('refreshData');
      }, (err: any) => {
        for (let prop in err.response.data.errors) {
          err.response.data.errors[prop].forEach((error: string) => {
            this.$buefy.toast.open({
              duration: 3000,
              message: error,
              type: 'is-danger'
            });
          });
        }
      });
    },
    onEdit() {
      this.convertDatesToString();
      this.appointmentService.edit(this.appointment).then((res: AxiosResponse<Response<Appointment>>) => {
        this.$buefy.toast.open({
          duration: 3000,
          message: res.data.message,
          type: 'is-success'
        });
        this.$emit('close');
        this.$emit('refreshData');
      }, (err: any) => {
        for (let prop in err.response.data.errors) {
          err.response.data.errors[prop].forEach((error: string) => {
            this.$buefy.toast.open({
              duration: 3000,
              message: error,
              type: 'is-danger'
            });
          }); 
        }
      });
    },
    convertDatesToString() {
      this.appointment.date = DateHelper.ToLocalISOString(this.date).split('T')[0];
      this.appointment.start = new Date(this.startDate).toLocaleTimeString();
      this.appointment.end = new Date(this.endDate).toLocaleTimeString();
    }
  },
  mounted() {
    this.getData();
  }
})

export default class AppointmentManageModal extends Vue {
  employeeService: EmployeeService = new EmployeeService();
  customerService: CustomerService = new CustomerService();
  appointmentService: AppointmentService = new AppointmentService();
  date: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  customers: CustomerShortModel[] = [];
  employees: EmployeeShortModel[] = [];
}
</script>

<style scoped>

</style>
