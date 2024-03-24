<template>
  <form @submit="mode === 'add' ? onAdd() : onEdit()">
    <div class="modal-card w-auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ mode === "add" ? "Add" : "Edit" }} department</p>
        <button
          type="button"
          class="delete"
          @click="$emit('close')"
        />
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            type="text"
            v-model.trim="department.fullname"
            placeholder="Department name"
            required>
          </b-input>
        </b-field>
        <b-field label="Address">
          <b-input
            type="text"
            v-model.trim="department.address"
            placeholder="Sovetskaya street, 8/12"
            required>
          </b-input>
        </b-field>
        <button
          class="btn btn-primary"
          type="submit"
        >Save</button>
      </section>
    </div>
  </form>
</template>
<script lang="ts">
import {Department} from "@/models/department.model";
import {DepartmentService} from "@/services/department.service";
import {AxiosResponse} from "axios";
import {Response} from "@/models/response";
import {Options, Vue} from "vue-class-component";

@Options ({
  props: {
    department: Department,
    mode: "add" as "add" | "edit"
  },
  emits: ['close', 'refreshData'],
  methods: {
    onAdd() {
      this.departmentService.add(this.department).then((res: AxiosResponse<Response<Department>>) => {
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
      this.departmentService.edit(this.department).then((res: AxiosResponse<Response<Department>>) => {
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
})

export default class DepartmentManageModal extends Vue {
  departmentService: DepartmentService = new DepartmentService();
}
</script>

<style scoped>

</style>