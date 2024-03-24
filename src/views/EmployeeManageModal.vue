<template>
  <form @submit="mode === 'add' ? onAdd() : onEdit()">
    <div class="modal-card w-auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ mode === "add" ? "Add" : "Edit" }} employee</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"
        />
      </header>
      <section class="modal-card-body">
        <b-field label="Full name">
          <b-input
              type="text"
              v-model.trim="employee.fullname"
              placeholder="Employee Fullname"
              required>
          </b-input>
        </b-field>
        <b-field label="Email">
          <b-input
              type="email"
              v-model.trim="employee.email"
              placeholder="someemail@mail.domain"
              required>
          </b-input>
        </b-field>
        <b-field label="Phone">
          <b-input
              type="tel"
              v-model.trim="employee.phone"
              placeholder="+375441234567"
              required>
          </b-input>
        </b-field>
        <b-field label="Address">
          <b-input
              type="text"
              v-model.trim="employee.address"
              placeholder="Sovetskaya street, 8/12"
              required>
          </b-input>
        </b-field>
        <div class="d-flex">
          <b-field label="Roles">
            <b-select
              multiple
              v-model="employee.roles"
            >
              <option v-for="role in roles" :value="role">{{ role }}</option>
            </b-select>
          </b-field>
          <b-field label="Department" class="ms-4">
            <b-select
              v-model="employee.departmentId"
            >
              <option v-for="department in departments" :value="department.id">{{ department.fullname }}</option>
            </b-select>
          </b-field>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
        >Save</button>
      </section>
    </div>
  </form>
</template>
<script lang="ts">
import {AxiosResponse} from "axios";
import {Response} from "@/models/response";
import {Employee, EmployeeCreate} from "@/models/employee.model";
import {EmployeeService} from "@/services/employee.service";
import {RoleService} from "@/services/role.service";
import {DepartmentService} from "@/services/department.service";
import {Department} from "@/models/department.model";
import {Options, Vue} from "vue-class-component";

@Options ({
  props: {
    employee: EmployeeCreate,
    mode: "add" as "add" | "edit"
  },
  emits: ['close', 'refreshData'],
  methods: {
    getData() {
      this.roleService.getAll().then((res: AxiosResponse<Response<{name: string}[]>>) => {
        this.roles = res.data.model.map(el => el.name);
      });
      this.departmentService.getAll().then((res: AxiosResponse<Response<Department[]>>) => {
        this.departments = res.data.model;
        if (!this.employee.departmentId) {
          this.employee.departmentId = this.departments[0].id;
        }
      });
    },
    onAdd() {
      this.employeeService.add(this.employee).then((res: AxiosResponse<Response<Employee>>) => {
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
      this.employeeService.edit(this.employee).then((res: AxiosResponse<Response<Employee>>) => {
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
    }
  },
  mounted() {
    this.getData();
  }
})

export default class EmployeeManageModal extends Vue {
  employeeService: EmployeeService = new EmployeeService();
  departmentService: DepartmentService = new DepartmentService();
  roleService: RoleService = new RoleService();
  roles: string[] = [];
  departments: Department[] = [];
}
</script>

<style scoped>

</style>
