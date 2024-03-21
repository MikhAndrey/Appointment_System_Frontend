<template>
  <form>
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
            v-model="department.fullname"
            placeholder="Department name"
            required>
          </b-input>
        </b-field>
        <b-field label="Address">
          <b-input
            type="text"
            v-model="department.address"
            placeholder="Sovetskaya street, 8/12"
            required>
          </b-input>
        </b-field>
        <button
          class="btn btn-primary"
          @click="mode === 'add' ? onAdd() : onEdit()"
        >Save</button>
      </section>
    </div>
  </form>
</template>
<script lang="ts">
import {Department} from "../models/department.model";
import {DepartmentService} from "../services/department.service";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";

export default {
  props: {
    department: Department,
    mode: "add" as "add" | "edit"
  },
  emits: ['close', 'refreshData'],
  data() {
    return {
      departmentService: new DepartmentService()
    }
  },
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
      }, (err: any) => alert(err));
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
      }, (err: any) => alert(err));
    }
  }
}
</script>

<style scoped>

</style>