<template>
  <div class="container is-fluid mt-4 mb-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3 class="title mb-0 is-3">Employees list</h3>
      <button class="btn btn-success" v-if="hasPermission('add_employee')">Add new</button>
    </div>
    <div v-if="employees.length > 0" class="row mb-4">
      <div class="col-sm-12 col-md-6 col-lg-4 col-4 pb-3 ps-0 pe-3" v-for="employee of employees">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ employee.fullname }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>
                <span class="title is-6">Department:</span>
                <span class="ms-2 card-data-value font-bolder">{{ employee.department.fullname }}</span>
              </p>
              <p>
                <b-icon
                    icon="email-outline"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ employee.email }}
                </span>
              </p>
              <p>
                <b-icon
                    icon="phone"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ employee.phone }}
                </span>
              </p>
              <p>
                <b-icon
                    icon="map-marker-outline"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ employee.address }}
                </span>
              </p>
            </div>
          </div>
          <footer
              class="card-footer"
              v-if="hasPermission('delete_employee') || hasPermission('change_employee')"
          >
            <a
                href="#"
                class="card-footer-item"
                v-if="hasPermission('change_employee')"
            >
              <b-icon icon="pencil" class="me-2"></b-icon>
              Edit
            </a>
            <a
                href="#"
                class="card-footer-item"
                v-if="hasPermission('delete_employee')"
            >
              <b-icon icon="delete" class="me-2">
              </b-icon>
              Delete
            </a>
          </footer>
        </div>
      </div>
    </div>
  </div>
  <b-loading v-model="isLoading"></b-loading>
</template>

<script lang="ts">
import {UserInfo} from "../models/account.model";
import {AccountService} from "../services/account.service";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../models/employee.model";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";

export default {
  data() {
    return {
      employees: [] as Employee[],
      accountService: new AccountService(),
      employeeService: new EmployeeService(),
      isLoading: true
    }
  },
  methods: {
    getData() {
      this.employeeService.getAll().then((res: AxiosResponse<Response<Employee[]>>) => {
        this.employees = res.data.model;
        this.isLoading = false;
      }).catch((err: any) => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    userInfo (): UserInfo | undefined {
      return this.$store.getters.getUserInfo;
    },
    hasPermission(): (permission: string) => any {
      return (permissionName: string) => this.$store.getters.isInPermission(permissionName);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
</style>
