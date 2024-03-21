<template>
  <div class="container is-fluid mt-4 mb-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3 class="title mb-0 is-3">Departments list</h3>
      <button 
        class="btn btn-success" 
        v-if="hasPermission('add_department')"
        @click="onAdd()"
      >Add new</button>
    </div>
    <div v-if="departments.length > 0" class="row mb-4">
      <div class="col-sm-12 col-md-6 col-lg-4 col-4 pb-3 ps-0 pe-3" v-for="department of departments">
        <div class="card">
          <header class="card-header bg-card-header">
            <p class="card-header-title">
              {{ department.fullname }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>
                <b-icon
                    icon="map-marker-outline"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ department.address }}
                </span>
              </p>
            </div>
          </div>
          <footer
            class="card-footer"
            v-if="hasPermission('change_department') || hasPermission('delete_department')"
          >
            <a
              @click="onEdit(department)"
              class="card-footer-item"
              v-if="hasPermission('change_department')"
            >
              <b-icon icon="pencil" class="me-2"></b-icon>
              Edit
            </a>
            <a
              @click="onDelete(department.id)"
              class="card-footer-item"
              v-if="hasPermission('delete_department')"
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
    aria-label="Department Modal"
    close-button-aria-label="Close"
    aria-modal
  >
    <template #default="props">
      <department-manage-modal 
        :department="actionsModel"
        :mode="manageMode"
        @close="props.close"
        @refresh-data="getData()"
      >
      </department-manage-modal>
    </template>
  </b-modal>
</template>

<script lang="ts">
import {UserInfo} from "../models/account.model";
import {AccountService} from "../services/account.service";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import {Department} from "../models/department.model";
import {DepartmentService} from "../services/department.service";
import DepartmentManageModal from "./DepartmentManageModal.vue";

export default {
  data() {
    return {
      departments: [] as Department[],
      actionsModel: new Department(),
      manageMode: "add" as "add" | "edit",
      accountService: new AccountService(),
      departmentService: new DepartmentService(),
      isModalOpened: false,
      isLoading: true
    }
  },
  components: {
    DepartmentManageModal
  },
  methods: {
    getData() {
      this.isLoading = true;
      this.departmentService.getAll().then((res: AxiosResponse<Response<Department[]>>) => {
        this.departments = res.data.model;
        this.isLoading = false;
      }).catch((err: any) => {
        this.isLoading = false;
      });
    },
    onAdd() {
      this.manageMode = "add";
      this.actionsModel = new Department();
      this.isModalOpened = true;
    },
    onEdit(department: Department) {
      this.manageMode = "edit";
      Object.assign(this.actionsModel, department);
      this.isModalOpened = true;
    },
    onDelete(id: number) {
      this.$buefy.dialog.confirm({
        title: 'Delete department',
        message: "Are you sure you want to <b>delete</b> this department? This action can't be undone.",
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.departmentService.delete(id).then((res: AxiosResponse<Response<any>>) => {
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
