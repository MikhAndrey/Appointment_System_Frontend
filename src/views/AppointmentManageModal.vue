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
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import {EmployeeShortModel} from "../models/employee.model";
import {EmployeeService} from "../services/employee.service";
import {CustomerService} from "../services/customer.service";
import {CustomerShortModel} from "../models/customer.model";
import {Appointment, AppointmentCreate} from "../models/appointment.model";
import {AppointmentService} from "../services/appointment.service";

export default {
  props: {
    appointment: AppointmentCreate,
    mode: "add" as "add" | "edit"
  },
  emits: ['close', 'refreshData'],
  data() {
    return {
      employeeService: new EmployeeService(),
      customerService: new CustomerService(),
      appointmentService: new AppointmentService(),
      date: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      customers: [] as CustomerShortModel[],
      employees: [] as EmployeeShortModel[]
    }
  },
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
      }, (err: any) => alert(err));
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
      }, (err: any) => alert(err));
    },
    convertDatesToString() {
      this.appointment.date = new Date(this.date).toISOString().split('T')[0];
      this.appointment.start = new Date(this.startDate).toLocaleTimeString();
      this.appointment.end = new Date(this.endDate).toLocaleTimeString();
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style scoped>

</style>
