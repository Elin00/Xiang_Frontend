<script setup>
import { onMounted } from "vue";
import { useSuppliersDataStore } from "../../stores/SuppliersData.js";
import { useEditSuppliersStore } from "../../stores/EditSuppliersData.js";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MemberHeader from "../../views/Members/Components/MemberHeader.vue";
import axios from "axios";

const storeEditSuppliers = useEditSuppliersStore();
const storeSuppliersData = useSuppliersDataStore();

onMounted(() => {
  storeEditSuppliers.getSuppliers();
})

const updateSupplier = async () => {
  try {
    await axios.put(
      `https://localhost:7073/api/TSuppliers/${storeSuppliersData.id}`,
      {
        supplierId: storeSuppliersData.id,
        name: storeSuppliersData.name,
        phone: storeSuppliersData.phone,
        address: storeSuppliersData.address,
        email: storeSuppliersData.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storeSuppliersData.token}`,
        },
      }
    );
    // 更新完畢後重新載入資料
    storeEditSuppliers.getSuppliers();
    alert("修改成功")
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div style="margin-left: 5%; margin-bottom: 15%;width: 600px;">
    <MemberHeader labelString="個人資料修改" />
    <hr style="border: 2px solid #2A4C65">
    <form @submit.prevent="submitForm" style="margin-left: 50px;">
      <div class="col-lg-4">
        <h5>姓名</h5>
        <input id="name" type="text" v-model="storeSuppliersData.name" />
      </div>
      <div class="col-lg-4">
        <h5>電話號碼</h5>
        <input id="phone" type="text" v-model="storeSuppliersData.phone" />
      </div>
      <div class="col-lg-4">
        <h5>聯絡地址</h5>
        <input id="address" type="text" v-model="storeSuppliersData.address" />
      </div>
      <div class="col-lg-4">
        <h5>電子郵件</h5>
        <input id="email" type="email" v-model="storeSuppliersData.email" />
      </div>


      <MaterialButton variant="outline" color="success" class="w-auto me-2" size="md" @click="updateSupplier">確認修改
      </MaterialButton>
    </form>

  </div>
</template>
<style scoped>
input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 7px 8px;
  width: 400px;
  font-size: 16px;
  color: #444;
  margin-bottom: 25px;
}

input:focus {
  border: 2px solid #c0d6df;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(31, 114, 91, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(31, 114, 91, 0.6)
}
</style>