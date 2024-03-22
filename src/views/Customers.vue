<template>
  <div class="container is-fluid mt-4 mb-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3 class="title mb-0 is-3">Customers list</h3>
      <button
        class="btn btn-success"
        v-if="hasPermission('add_customer')"
        @click="onAdd()"
      >Add new</button>
    </div>
    <div v-if="customers.length > 0" class="row mb-4">
      <div class="col-sm-12 col-md-6 col-lg-4 col-4 pb-3 ps-0 pe-3" v-for="customer of customers">
        <div class="card">
          <header class="card-header bg-card-header">
            <p class="card-header-title">
              {{ customer.fullname }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>
                <b-icon
                    icon="email-outline"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ customer.email }}
                </span>
              </p>
              <p>
                <b-icon
                    icon="phone"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ customer.phone }}
                </span>
              </p>
              <p>
                <b-icon
                    icon="map-marker-outline"
                    class="me-2"
                >
                </b-icon>
                <span class="card-data-value">
                  {{ customer.address }}
                </span>
              </p>
            </div>
          </div>
          <footer
            class="card-footer"
            v-if="hasPermission('delete_customer') || hasPermission('change_customer')"
          >
            <a
              @click="onEdit(customer)"
              class="card-footer-item"
              v-if="hasPermission('change_customer')"
            >
              <b-icon icon="pencil" class="me-2"></b-icon>
              Edit
            </a>
            <a
              @click="onDelete(customer.id)"
              class="card-footer-item"
              v-if="hasPermission('delete_customer')"
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
    aria-label="Customer Modal"
    close-button-aria-label="Close"
    aria-modal
  >
    <template #default="props">
      <customer-manage-modal
        class="actions-modal-mid"
        :customer="actionsModel"
        :mode="manageMode"
        @close="props.close"
        @refresh-data="getData()"
      >
      </customer-manage-modal>
    </template>
  </b-modal>
</template>

<script lang="ts">
import {UserInfo} from "../models/account.model";
import {AccountService} from "../services/account.service";
import {AxiosResponse} from "axios";
import {PageResponse, Response} from "../models/response";
import {Customer} from "../models/customer.model";
import {CustomerService} from "../services/customer.service";
import {PaginationInfo} from "../models/pagination";
import CustomerManageModal from "./CustomerManageModal.vue";

export default {
  components: {
    CustomerManageModal
  },
  data() {
    return {
      customers: [] as Customer[],
      actionsModel: new Customer(),
      manageMode: "add" as "add" | "edit",
      accountService: new AccountService(),
      customerService: new CustomerService(),
      isModalOpened: false,
      isLoading: true,
      paginationInfo: new PaginationInfo()
    }
  },
  methods: {
    getData() {
      this.isLoading = true;
      this.customerService.getPage(this.paginationInfo.pageNumber, this.pageSize).then((res: AxiosResponse<PageResponse<Customer[]>>) => {
        this.paginationInfo = res.data as PaginationInfo;
        this.customers = res.data.model;
        this.isLoading = false;
      }).catch((err: any) => {
        this.isLoading = false;
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
    onAdd() {
      this.manageMode = "add";
      this.actionsModel = new Customer();
      this.isModalOpened = true;
    },
    onEdit(customer: Customer) {
      this.manageMode = "edit";
      Object.assign(this.actionsModel, customer);
      this.isModalOpened = true;
    },
    onDelete(id: number) {
      this.$buefy.dialog.confirm({
        title: 'Delete customer',
        message: "Are you sure you want to <b>delete</b> this customer? This action can't be undone.",
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.customerService.delete(id).then((res: AxiosResponse<Response<any>>) => {
            this.$buefy.toast.open({
              duration: 3000,
              message: res.data.message,
              type: 'is-success'
            });
            this.getData();
          }).catch((err: any) => {
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
      })
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
  }
};
</script>

<style scoped>
</style>
