<template>
  <div class="container is-fluid mt-4 mb-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3 class="title mb-0 is-3">Employees list</h3>
      <button
        class="btn btn-success"
        v-if="hasPermission('add_employee')"
        @click="onAdd()"
      >Add new</button>
    </div>
    <div v-if="employees.length > 0" class="row mb-4">
      <div class="col-sm-12 col-md-6 col-lg-4 col-4 pb-3 ps-0 pe-3" v-for="employee of employees">
        <div class="card">
          <header class="card-header bg-card-header">
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
              <p v-if="employee.roles.length > 0">
                <b-icon
                  icon="account-group"
                  class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ employee.roles.join(', ') }}
                </span>
              </p>
              <p v-if="employee.roles.length === 0">
                No roles specified
              </p>
            </div>
          </div>
          <footer
            class="card-footer"
            v-if="hasPermission('delete_employee') || hasPermission('change_employee')"
          >
            <a
              @click="onEdit(employee)"
              class="card-footer-item"
              v-if="hasPermission('change_employee')"
            >
              <b-icon icon="pencil" class="me-2"></b-icon>
              Edit
            </a>
            <a
              @click="onDelete(employee.id)"
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
  <b-modal
    v-model="isModalOpened"
    has-modal-card
    trap-focus
    :destroy-on-hide="true"
    aria-role="dialog"
    aria-label="Employee Modal"
    close-button-aria-label="Close"
    aria-modal
  >
    <template #default="props">
      <employee-manage-modal
        :employee="actionsModel"
        :mode="manageMode"
        @close="props.close"
        @refresh-data="getData()"
      >
      </employee-manage-modal>
    </template>
  </b-modal>
</template>

<script lang="ts">
import {UserInfo} from "../models/account.model";
import {AccountService} from "../services/account.service";
import {EmployeeService} from "../services/employee.service";
import {Employee, EmployeeCreate} from "../models/employee.model";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import EmployeeManageModal from "./EmployeeManageModal.vue";

export default {
  components: {
    EmployeeManageModal
  },
  data() {
    return {
      employees: [] as Employee[],
      actionsModel: new EmployeeCreate(),
      manageMode: "add" as "add" | "edit",
      accountService: new AccountService(),
      employeeService: new EmployeeService(),
      isModalOpened: false,
      isLoading: true
    }
  },
  methods: {
    getData() {
      this.isLoading = true;
      this.employeeService.getAll().then((res: AxiosResponse<Response<Employee[]>>) => {
        this.employees = res.data.model;
        this.isLoading = false;
      }).catch((err: any) => {
        this.isLoading = false;
      });
    },
    onAdd() {
      this.manageMode = "add";
      this.actionsModel = new Employee();
      this.isModalOpened = true;
    },
    onEdit(employee: Employee) {
      this.manageMode = "edit";
      Object.assign(this.actionsModel, employee);
      this.actionsModel.departmentId = employee.department.id;
      this.isModalOpened = true;
    },
    onDelete(id: number) {
      this.$buefy.dialog.confirm({
        title: 'Delete employee',
        message: "Are you sure you want to <b>delete</b> this employee? This action can't be undone.",
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.employeeService.delete(id).then((res: AxiosResponse<Response<any>>) => {
            this.$buefy.toast.open({
              duration: 3000,
              message: res.data.message,
              type: 'is-success'
            });
            this.getData();
          });
        }
      })
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
