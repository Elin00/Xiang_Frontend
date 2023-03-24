<script setup>
import { ref, computed, onMounted } from "vue";
import { useSuppliersDataStore } from "../../stores/SuppliersData.js";
import { useEditSuppliersStore } from "../../stores/EditSuppliersData.js"
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MemberHeader from "../../views/Members/Components/MemberHeader.vue";

const { SUser, EditSuppliers } = useEditSuppliersStore();
const Suppliersstore = useSuppliersDataStore();


const updateEmployee = async () => {
  try {
    await axios.put(
      `https://localhost:7073/api/Suppliers/${SUser.id}`,
      SUser,
      {
        headers: {
          Authorization: `Bearer ${SuppliersData.token}`,
        },
      }
    );
    // 更新完畢後重新載入資料
    EditSuppliers();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
  <h2>修改員工資料</h2>
  <div>
    <label for="name">姓名：</label>
    <input id="name" type="text" v-model="SUser.name" />
  </div>
  <div>
    <label for="phone">電話：</label>
      <input id="phone" type="text" v-model="SUser.phone" />
    </div>
    <div>
      <label for="email">電子郵件：</label>
      <input id="email" type="email" v-model="SUser.email" />
    </div>
    <div>
      <label for="address">地址：</label>
      <input id="address" type="text" v-model="SUser.address" />
  </div>
  <button @click="updateEmployee">更新員工資料</button>
</div>
<p>eeeeeeeeeeeeaa{{ Suppliersstore.email }}</p>
<p>eeeeeeeeeeeeaa{{ SUser.email }}</p>

<div style="margin-left: 10%; margin-bottom: 15%">
    <MemberHeader labelString="個人資料修改" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-6 border-bottom mb-5">
          <h5>電子信箱</h5>
          <div class="d-flex justify-content-between">
            <p>{{ Suppliersstore.email }}</p>
            <!-- <h6
                        id="email"
                                  data-bs-toggle="modal"
                                          data-bs-target="#exampleModal"
                                                    @click="modalTitleBody"
                                                  >
                                                    編輯
                                                  </h6> -->
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 border-bottom mb-5">
          <h5>姓名</h5>
          <div class="d-flex justify-content-between">
            <p>{{ Suppliersstore.name }}</p>
            <!-- <h6
                        id="email"
                                  data-bs-toggle="modal"
                                          data-bs-target="#exampleModal"
                                                    @click="modalTitleBody"
                                                  >
                                                    編輯
                                                  </h6> -->
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 border-bottom mb-5">
          <h5>電話號碼</h5>
          <div class="d-flex justify-content-between">
            <p>{{ Suppliersstore.phone }}</p>
            <!-- <h6
                        id="email"
                                        data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                          @click="modalTitleBody"
                                                        >
                                                          編輯
                                                        </h6> -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 border-bottom mb-5">
          <h5>地址</h5>
          <div class="d-flex justify-content-between">
            <p>{{ Suppliersstore.address }}</p>
            <!-- <h6
                                                          id="email"
                                                          data-bs-toggle="modal"
                                                          data-bs-target="#exampleModal"
                                                          @click="modalTitleBody"
                                                        >
                                                          編輯
                                                        </h6> -->
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <MaterialInput class="input-group-static mb-4" label="姓名" type="text" placeholder="欸另"
          v-model="Suppliersstore.name" />
      </div>
      <div>
        <input type="text" value="Othani">
      </div>
      <div class="col-lg-4">
        <MaterialInput class="input-group-static mb-4" label="電話" type="text" placeholder="{{}}"
          v-model="Suppliersstore.phone" />
      </div>
      <div class="col-lg-4">
        <MaterialInput class="input-group-static mb-4" label="Email" type="text" placeholder="{{}}"
          v-model="Suppliersstore.email" />
      </div>
      <div class="col-lg-4">
        <MaterialInput class="input-group-static mb-4" label="聯絡地址" type="text" placeholder="{{}}"
          v-model="Suppliersstore.address" />
      </div>
      <div class="col-lg-4">
        <MaterialInput class="input-group-static mb-4" label="密碼" type="password" placeholder="{{}}"
          v-model="Suppliersstore.password" />
      </div>
      <MaterialButton variant="outline" color="success" class="w-auto me-2" size="sm">確認修改</MaterialButton>
    </form>
  </div>
</template>
<style scoped></style>