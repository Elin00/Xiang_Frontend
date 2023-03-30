<script setup>
import { reactive, ref, onMounted } from "vue";
import Modal from "../../Components/Modal.vue";
import { useCustomerStore } from "../../../../stores/CustomerData.js";
import { useEditCustomerStore } from "../../../../stores/EditCustomerData.js";

import axios from "axios";

const currentSelectModal = ref("");
const CustomerData = useCustomerStore();
const EditCustomer = useEditCustomerStore();

const modalTitle = ref("編輯姓名");
const modalBody = ref("會呈現在訂單上的名稱。");

onMounted(() => {
  EditCustomer.EditCustomerres();
});

const modalText = reactive({
  name: {
    title: "編輯姓名",
    body: "會呈現在訂單上的名稱。",
  },
  email: {
    title: "變更信箱",
    body: "驗證您的信箱為您接收最新的訂單資訊與優惠訊息。",
  },
  phone: {
    title: "編輯手機號碼",
    body: "我們將寄送簡訊，以確認您的手機號碼。",
  },
});

const modalTitleBody = (e) => {
  console.log(e.target.id);
  switch (e.target.id) {
    case "name":
      modalTitle.value = modalText.name.title;
      modalBody.value = modalText.name.body;
      currentSelectModal.value = "name";
      break;
    case "email":
      modalTitle.value = modalText.email.title;
      modalBody.value = modalText.email.body;
      currentSelectModal.value = "email";
      break;
    case "phone":
      modalTitle.value = modalText.phone.title;
      modalBody.value = modalText.phone.body;
      currentSelectModal.value = "phone";
      break;
    default:
      modalTitle.value = modalText.name.title;
      modalBody.value = modalText.name.body;
      currentSelectModal.value = "name";
      break;
  }
};

const modalHandler = async (text) => {
  switch (currentSelectModal.value) {
    case "name":
      EditCustomer.user.name = text;
      break;
    case "email":
      try {
        const response = await axios.post(
          `https://localhost:7073/api/Client/check-information/${CustomerData.id}`,
          { KeyWord: text },
          {
            headers: {
              Authorization: `Bearer ${CustomerData.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          EditCustomer.user.email = text;
          // console.log(EditCustomer.user.email);
        }

      } catch (error) {
        if (error.response.status === 400) {
          // console.log(error.response.data);
          alert("已有相同的電話");
        }
      }
      break;
    case "phone":
      try {
        const response = await axios.post(
          `https://localhost:7073/api/Client/check-information/${CustomerData.id}`,
          { KeyWord: text },
          {
            headers: {
              Authorization: `Bearer ${CustomerData.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          EditCustomer.user.phone = text;
        }
      } catch (error) {
        if (error.response.status === 400) {
          // console.log(error.response.data);
          alert("已有相同的電話");
        }
      }
      break;
    default:
      EditCustomer.user.name = text;
      break;
  }
};
</script>

<template>
  <div class="container">
    <div class="row mb-5">
      <h4>修改個人資料</h4>
      <p>我鄭智智會好好保存你的資料</p>
    </div>
    <div class="row">
      <div class="col-6 border-bottom mb-5">
        <h5>姓名</h5>
        <div class="d-flex justify-content-between">
          <p>{{ EditCustomer.user.name }}</p>
          <h6 id="name" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="modalTitleBody">
            編輯
          </h6>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 border-bottom mb-5">
        <h5>電子信箱</h5>
        <div class="d-flex justify-content-between">
          <p>{{ EditCustomer.user.email }}</p>
          <h6 id="email" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="modalTitleBody">
            編輯
          </h6>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 border-bottom mb-5">
        <h5>電話號碼</h5>
        <div class="d-flex justify-content-between">
          <p>{{ EditCustomer.user.phone }}</p>
          <h6 id="phone" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="modalTitleBody">
            編輯
          </h6>
        </div>
      </div>
    </div>
  </div>
  <Modal :title="modalTitle" :body="modalBody" @modifyText="modalHandler" />
</template>

<style scoped>
h5+p {
  font-family: sans-serif;
  font-weight: 900;
}

h6 {
  cursor: pointer;
}

input {
  width: 60px;
  border: 1px solid gray;
}
</style>
