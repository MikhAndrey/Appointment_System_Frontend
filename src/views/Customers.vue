<template>
  <div class="container is-fluid mt-4 mb-4">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3 class="title mb-0 is-3">Customers list</h3>
      <button class="btn btn-success" v-if="hasPermission('add_customer')">Add new</button>
    </div>
    <div v-if="customers.length > 0" class="row mb-4">
      <div class="col-sm-12 col-md-6 col-lg-4 col-4 pb-3 ps-0 pe-3" v-for="customer of customers">
        <div class="card">
          <header class="card-header">
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
                href="#"
                class="card-footer-item"
                v-if="hasPermission('change_customer')"
            >
              <b-icon icon="pencil" class="me-2"></b-icon>
              Edit
            </a>
            <a
                href="#"
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
import {UserInfo} from "../models/account.model";
import {AccountService} from "../services/account.service";
import {AxiosResponse} from "axios";
import {PageResponse} from "../models/response";
import {Customer} from "../models/customer.model";
import {CustomerService} from "../services/customer.service";
import {PaginationInfo} from "../models/pagination";

export default {
  data() {
    return {
      customers: [] as Customer[],
      accountService: new AccountService(),
      customerService: new CustomerService(),
      isLoading: true,
      paginationInfo: new PaginationInfo()
    }
  },
  methods: {
    getData() {
      this.customerService.getPage(this.paginationInfo.pageNumber, this.pageSize).then((res: AxiosResponse<PageResponse<Customer[]>>) => {
        this.paginationInfo = res.data as PaginationInfo;
        this.customers = res.data.model;
        this.isLoading = false;
      }).catch((err: any) => {
        this.isLoading = false;
      });
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
