<template>
  <form @submit="mode === 'add' ? onAdd() : onEdit()">
    <div class="modal-card w-auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ mode === "add" ? "Add" : "Edit" }} customer</p>
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
            v-model.trim="customer.fullname"
            placeholder="Customer Fullname"
            required>
          </b-input>
        </b-field>
        <b-field label="Email">
          <b-input
            type="email"
            v-model.trim="customer.email"
            placeholder="someemail@mail.domain"
            required>
          </b-input>
        </b-field>
        <b-field label="Phone">
          <b-input
            type="tel"
            v-model.trim="customer.phone"
            placeholder="+375441234567"
            required>
          </b-input>
        </b-field>
        <b-field label="Address">
          <b-input
            type="text"
            v-model.trim="customer.address"
            placeholder="Sovetskaya street, 8/12"
            required>
          </b-input>
        </b-field>
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
import {Response} from "../models/response";
import {Customer} from "../models/customer.model";
import {CustomerService} from "../services/customer.service";

export default {
  props: {
    customer: Customer,
    mode: "add" as "add" | "edit"
  },
  emits: ['close', 'refreshData'],
  data() {
    return {
      customerService: new CustomerService()
    }
  },
  methods: {
    onAdd() {
      this.customerService.add(this.customer).then((res: AxiosResponse<Response<Customer>>) => {
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
      this.customerService.edit(this.customer).then((res: AxiosResponse<Response<Customer>>) => {
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
  }
}
</script>

<style scoped>

</style>
