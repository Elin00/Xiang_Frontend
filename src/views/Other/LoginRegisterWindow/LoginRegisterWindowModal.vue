<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
import { useCustomerStore } from "../../../stores/CustomerData.js";
import "../../../assets/js/core/bootstrap.min.js";
//Naive
import { NTimeline, NTimelineItem, NIcon, NSpace, NButton } from "naive-ui";

// image
import team4 from "@/assets/img/team-2.jpg";
import vueMkHeader from "@/assets/img/office-dark.jpg";
import Cooperation from "@/assets/img/Cooperation.jpg";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});

const Supplier = reactive({
  Name: "",
  Email: "",
  Phone: "",
  Password: "",
});

const Customer = useCustomerStore();

//當登入時，移除掉所有Modal資訊
async function submitLogin() {
  const isLoginSuccess = await Customer.Login();
  if (isLoginSuccess) {
    const modalElement = document.getElementById("Login");
    console.log(modalElement);
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  } else {
    alert("帳密錯誤");
  }
}
async function submitRegister() {
  const isregisterSuccess = await Customer.register();
  console.log(isregisterSuccess);
  if (isregisterSuccess) {
    const modalElement = document.getElementById("Register");
    console.log(modalElement);
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    // 找到所有的背景元素
    const backdrops = document.querySelectorAll(".modal-backdrop");
    // 逐個移除所有背景元素
    for (let i = 0; i < backdrops.length; i++) {
      backdrops[i].remove();
    }
  }
}
</script>

<template>
  <!-- 登入彈出視窗 -->
  <div class="modal fade" id="Login">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="container my-auto">
          <div class="row">
            <div class="col-12 mx-auto">
              <div class="card z-index-0 fadeIn3 fadeInBottom">
                <div
                  class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                >
                  <div
                    class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                  >
                    <h4
                      class="text-white font-weight-bolder text-center mt-2 mb-0"
                    >
                      登入
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <form
                    role="form"
                    class="text-start"
                    @submit.prevent="submitLogin"
                  >
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal"
                        >電子信箱</label
                      ><!--v-if--><input
                        v-model="Customer.Email"
                        type="email"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired="true"
                      />
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">密碼</label
                      ><!--v-if--><input
                        v-model="Customer.Password"
                        type="password"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired="true"
                      />
                    </div>
                    <div class="form-check" style="padding-left: 0px">
                      <a href="#" style="color: green">忘記密碼?</a>
                    </div>

                    <div class="text-center">
                      <button
                        class="btn bg-gradient-success btn-md w-100 false my-4 mb-2"
                        @click="submitLogin"
                      >
                        登入
                      </button>
                    </div>
                    <div class="order">
                      <span class="line"></span>
                      <span class="txt">或</span>
                      <span class="line"></span>
                    </div>
                    <div class="row mt-3">
                      <div class="col-2 text-center ms-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-facebook text-info text-lg"></i>
                        </a>
                      </div>
                      <div class="col-2 text-center me-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-google text-warning text-lg"></i>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 業者註冊彈出視窗 -->
  <div class="modal fade" id="CooperationRegister">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="container my-auto">
          <div class="row">
            <div class="col-12 mx-auto">
              <div class="card z-index-0 fadeIn3 fadeInBottom">
                <div
                  class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                >
                  <div
                    class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                  >
                    <h4
                      class="text-white font-weight-bolder text-center mt-2 mb-0"
                    >
                      立即註冊成為想享夥伴
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal"
                        >姓名</label
                      ><!--v-if--><input
                        v-model="Supplier.Name"
                        type="name"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired="true"
                      />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal"
                        >電子信箱</label
                      ><!--v-if--><input
                        v-model="Supplier.Email"
                        type="email"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired="true"
                      />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal"
                        >電話</label
                      ><!--v-if--><input
                        v-model="Supplier.Phone"
                        type="phone"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired="true"
                      />
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">密碼</label
                      ><!--v-if--><input
                        v-model="Supplier.Password"
                        type="password"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired="true"
                      />
                    </div>
                    <div class="form-check" style="padding-left: 0">
                      <MaterialCheckbox style="padding-left: 0" checked
                        >我已閱讀並同意 想享<a href="#" style="color: green"
                          >各項條款</a
                        >
                      </MaterialCheckbox>
                    </div>

                    <div class="text-center">
                      <button
                        class="btn bg-gradient-success btn-md w-100 false my-4 mb-2"
                      >
                        註冊
                      </button>
                    </div>
                    <div class="order">
                      <span class="line"></span>
                      <span class="txt">或</span>
                      <span class="line"></span>
                    </div>
                    <div class="row mt-3">
                      <div class="col-2 text-center ms-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-facebook text-info text-lg"></i>
                        </a>
                      </div>
                      <div class="col-2 text-center me-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-google text-warning text-lg"></i>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 會員註冊彈出視窗 -->
  <div class="modal fade" id="Register">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="container my-auto">
          <div class="row">
            <div class="col-12 mx-auto">
              <div class="card z-index-0 fadeIn3 fadeInBottom">
                <div
                  class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                >
                  <div
                    class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                  >
                    <h4
                      class="text-white font-weight-bolder text-center mt-2 mb-0"
                    >
                      註冊成為會員
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <form
                    role="form"
                    class="text-start"
                    @submit.prevent="submitRegister"
                  >
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal"
                        >姓名</label
                      ><!--v-if--><input
                        v-model="Customer.registerCustomer.Name"
                        type="name"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired
                      />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal"
                        >電子信箱</label
                      ><!--v-if--><input
                        v-model="Customer.registerCustomer.Email"
                        type="email"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired
                      />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal"
                        >電話</label
                      ><!--v-if--><input
                        v-model="Customer.registerCustomer.Phone"
                        type="phone"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired
                      />
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">密碼</label
                      ><!--v-if--><input
                        v-model="Customer.registerCustomer.Password"
                        type="password"
                        class="form-control form-control-md"
                        placeholder=""
                        isrequired
                      />
                    </div>
                    <div class="form-check" style="padding-left: 0px">
                      <MaterialCheckbox
                        id="terms"
                        style="padding-left: 0"
                        checked
                        >我已閱讀並同意 想享<a href="#" style="color: green"
                          >各項條款</a
                        >
                      </MaterialCheckbox>
                    </div>

                    <div class="text-center">
                      <button
                        class="btn bg-gradient-success btn-md w-100 false my-4 mb-2" 
                      >
                        註冊
                      </button>
                    </div>
                    <div class="order">
                      <span class="line"></span>
                      <span class="txt">或</span>
                      <span class="line"></span>
                    </div>
                    <div class="row mt-3">
                      <div class="col-2 text-center ms-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-facebook text-info text-lg"></i>
                        </a>
                      </div>
                      <div class="col-2 text-center me-auto">
                        <a class="btn btn-link px-3" href="javascript:;">
                          <i class="fa fa-google text-warning text-lg"></i>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.order {
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.order .line {
  display: inline-block;
  width: 150px;
  border-top: 1px solid #ccc;
  transform: translateY(-4px);
}

.order .txt {
  color: #686868;
  vertical-align: middle;
}
</style>
