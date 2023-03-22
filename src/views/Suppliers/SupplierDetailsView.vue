<script setup>
import { onMounted, ref, watch } from "vue";
import { useSuppliersDataStore } from "../../stores/SuppliersData.js";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MemberHeader from "../../views/Members/Components/MemberHeader.vue";

const Suppliersstore = useSuppliersDataStore();
</script>

<template>
  <div style="margin-left: 10%; margin-bottom: 15%">
    <MemberHeader labelString="個人資料修改" />
    <form @submit.prevent="submitForm">
      <div class="col-lg-4">
        <MaterialInput
          class="input-group-static mb-4"
          label="姓名"
          type="text"
          placeholder="{{}}"
          v-model="Suppliersstore.name"
        />
      </div>
      <div class="col-lg-4">
        <MaterialInput
          class="input-group-static mb-4"
          label="電話"
          type="text"
          placeholder="{{}}"
          v-model="Suppliersstore.phone"
        />
      </div>
      <div class="col-lg-4">
        <MaterialInput
          class="input-group-static mb-4"
          label="Email"
          type="text"
          placeholder="{{}}"
          v-model="Suppliersstore.email"
        />
      </div>
      <div class="col-lg-4">
        <MaterialInput
          class="input-group-static mb-4"
          label="聯絡地址"
          type="text"
          placeholder="{{}}"
          v-model="Suppliersstore.address"
        />
      </div>
      <div class="col-lg-4">
        <MaterialInput
          class="input-group-static mb-4"
          label="密碼"
          type="password"
          placeholder="{{}}"
          v-model="Suppliersstore.password"
        />
      </div>
      <MaterialButton
        variant="outline"
        color="success"
        class="w-auto me-2"
        size="sm"
        >確認修改</MaterialButton
      >
    </form>
  </div>
</template>
<style scoped>
</style>