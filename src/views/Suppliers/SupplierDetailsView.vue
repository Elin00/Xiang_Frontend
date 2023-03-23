<script setup>
import { ref, computed, onMounted } from "vue";
import { useSuppliersDataStore } from "../../stores/SuppliersData.js";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MemberHeader from "../../views/Members/Components/MemberHeader.vue";

// onMounted(() => {
//   setMaterialInput();
// });

const Suppliersstore = useSuppliersDataStore();
//取得當前登入的供應商姓名
const supplierName = computed(() => Suppliersstore.name);
// 使用 ref 儲存供應商輸入的新姓名
const SName = ref(supplierName);

// 定義更新姓名的方法
const updateName = () => {
  Suppliersstore.name = SName;
  // 調用 API 更新供應商姓名，略
};
</script>

<template>
  <div style="margin-left: 10%; margin-bottom: 15%">
    <MemberHeader labelString="個人資料修改" />
    <form @submit.prevent="submitForm">
      <div>
        <h2>{{ supplierName }}</h2>
        <input v-model="SName" />
        <button @click="updateName">更新</button>
      </div>
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
<style scoped></style>