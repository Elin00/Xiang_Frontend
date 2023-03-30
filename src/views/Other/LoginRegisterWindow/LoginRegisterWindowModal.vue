<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { useCustomerStore } from "../../../stores/CustomerData.js";
import "../../../assets/js/core/bootstrap.min.js";

//Vue Material Kit 2 components
import setMaterialInput from "@/assets/js/material-input";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";

import { useSuppliersDataStore } from "../../../stores/SuppliersData.js";

onMounted(() => {
  setMaterialInput();
});
const storeSuppliersData = useSuppliersDataStore();
const isChecked = ref(false);
const textOff = "我是會員";
const textOn = "我是業者";
const title = ref("會員登入");

watch(isChecked, (newValue) => {
  if (newValue) {
    title.value = "業者登入";
  } else {
    title.value = "會員登入";
  }
});

const Customer = useCustomerStore();

onMounted(() => {
  Customer.FacebookOnmouned();
});


//當登入時，移除掉所有Modal資訊
async function SuppliersLogin() {
  const isLoginSuccess = await storeSuppliersData.SLogin();
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

async function SupplierRegister() {
  const isregisterSuccess = await storeSuppliersData.SupplierRegister();
  console.log(isregisterSuccess);
  if (isregisterSuccess) {
    const modalElement = document.getElementById("CooperationRegister");
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
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                    <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                      <p style="font-weight: bold; font-size: 26px">
                        {{ title }}
                      </p>
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <!-- 切換按鈕 -->
                  <div class="checkbox-wrapper-10">
                    <input class="tgl tgl-flip" id="cb5" type="checkbox" v-model="isChecked" />
                    <label class="tgl-btn" :data-tg-off="textOff" :data-tg-on="textOn" for="cb5"></label>
                  </div>

                  <div>
                    <!-- 業者的登入畫面 -->
                    <div v-if="isChecked">
                      <form role="form" class="text-start" @submit.prevent="SuppliersLogin">
                        <div class="input-group input-group-outline my-3">
                          <label class="form-label" data-bs-toggle="modal"></label>
                          <input v-model="storeSuppliersData.email" type="email" class="form-control form-control-md"
                            placeholder="電子信箱" isrequired="true" />
                        </div>
                        <div class="input-group input-group-outline mb-3">
                          <label class="form-label"></label>
                          <input v-model="storeSuppliersData.password" type="password"
                            class="form-control form-control-md" placeholder="密碼" isrequired="true" autocomplete="on" />
                        </div>
                        <div class="form-check" style="padding-left: 0px">
                          <a href="#" style="color: green">忘記密碼?</a>
                        </div>

                        <div class="text-center">
                          <button class="btn bg-gradient-success btn-md w-100 false my-4 mb-2" @click="SuppliersLogin">
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

                    <!-- 會員的登入畫面 -->
                    <div v-else>
                      <form role="form" class="text-start" @submit.prevent="Customer.Login">
                        <div class="input-group input-group-outline my-3">
                          <label class="form-label" data-bs-toggle="modal"></label>
                          <input v-model="Customer.Email" type="email" class="form-control form-control-md"
                            placeholder="電子信箱" isrequired="true" />
                        </div>
                        <div class="input-group input-group-outline mb-3">
                          <label class="form-label"></label>
                          <input v-model="Customer.Password" type="password" class="form-control form-control-md"
                            placeholder="密碼" isrequired="true" autocomplete="on" />
                        </div>
                        <div class="form-check" style="padding-left: 0px">
                          <a href="#" style="color: green">忘記密碼?</a>
                        </div>

                        <div class="text-center">
                          <button class="btn bg-gradient-success btn-md w-100 false my-4 mb-2">
                            登入
                          </button>
                        </div>
                        <div class="order">
                          <span class="line"></span>
                          <span class="txt">或</span>
                          <span class="line"></span>
                        </div>
                      </form>
                      <div class="row mt-3">
                        <div class="col-2 text-center ms-auto">
                          <button class="btn btn-link px-3" @click="Customer.loginWithFacebook">
                            <i class="fa fa-facebook text-info text-lg"></i>
                          </button>
                        </div>
                        <div class="col-2 text-center me-auto">
                          <button @click="Customer.handleGoogleAccessTokenLogin" class="btn btn-primary">
                            <i class="fa fa-google"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                    <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                      立即註冊成為想享夥伴
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" @submit.prevent="SupplierRegister">
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">姓名</label>
                      <input v-model="storeSuppliersData.registerSupplier.name" type="name"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">電子信箱</label>
                      <input v-model="storeSuppliersData.registerSupplier.email" type="email"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">電話</label>
                      <input v-model="storeSuppliersData.registerSupplier.phone" type="phone"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">聯絡地址</label>
                      <input v-model="storeSuppliersData.registerSupplier.address" type="address"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">密碼</label>
                      <input v-model="storeSuppliersData.registerSupplier.password" type="password"
                        class="form-control form-control-md" placeholder="" isrequired="true" autocomplete="on" />
                    </div>
                    <div class="form-check" style="padding-left: 0">
                      <MaterialCheckbox id="terms" style="padding-left: 0" checked>我已閱讀並同意 想享<a href="#"
                          style="color: green">各項條款</a>
                      </MaterialCheckbox>
                    </div>

                    <div class="text-center">
                      <button class="btn bg-gradient-success btn-md w-100 false my-4 mb-2"
                        @click.prevent="storeSuppliersData.SupplierRegister">
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
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                    <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                      註冊成為會員
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" @submit.prevent="Customer.register">
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">姓名</label>
                      <input v-model="Customer.registerCustomer.Name" type="name" class="form-control form-control-md"
                        placeholder="" isrequired />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">電子信箱</label>
                      <input v-model="Customer.registerCustomer.Email" type="email" class="form-control form-control-md"
                        placeholder="" isrequired />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">電話</label>
                      <input v-model="Customer.registerCustomer.Phone" type="phone" class="form-control form-control-md"
                        placeholder="" isrequired />
                    </div>

                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">密碼</label>
                      <input v-model="Customer.registerCustomer.Password" type="password"
                        class="form-control form-control-md" placeholder="" isrequired autocomplete="on" />
                    </div>
                    <div class="form-check" style="padding-left: 0px">
                      <MaterialCheckbox id="terms2" style="padding-left: 0" checked>我已閱讀並同意 想享<a href="#"
                          style="color: green">各項條款</a>
                      </MaterialCheckbox>
                    </div>

                    <div class="text-center">
                      <button class="btn bg-gradient-success btn-md w-100 false my-4 mb-2">
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

<style scoped>
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

/* 切換按鈕 */
.checkbox-wrapper-10 .tgl {
  display: none;
}

.checkbox-wrapper-10 .tgl,
.checkbox-wrapper-10 .tgl:after,
.checkbox-wrapper-10 .tgl:before,
.checkbox-wrapper-10 .tgl *,
.checkbox-wrapper-10 .tgl *:after,
.checkbox-wrapper-10 .tgl *:before,
.checkbox-wrapper-10 .tgl+.tgl-btn {
  box-sizing: border-box;
}

.checkbox-wrapper-10 .tgl::-moz-selection,
.checkbox-wrapper-10 .tgl:after::-moz-selection,
.checkbox-wrapper-10 .tgl:before::-moz-selection,
.checkbox-wrapper-10 .tgl *::-moz-selection,
.checkbox-wrapper-10 .tgl *:after::-moz-selection,
.checkbox-wrapper-10 .tgl *:before::-moz-selection,
.checkbox-wrapper-10 .tgl+.tgl-btn::-moz-selection,
.checkbox-wrapper-10 .tgl::selection,
.checkbox-wrapper-10 .tgl:after::selection,
.checkbox-wrapper-10 .tgl:before::selection,
.checkbox-wrapper-10 .tgl *::selection,
.checkbox-wrapper-10 .tgl *:after::selection,
.checkbox-wrapper-10 .tgl *:before::selection,
.checkbox-wrapper-10 .tgl+.tgl-btn::selection {
  background: none;
}

.checkbox-wrapper-10 .tgl+.tgl-btn {
  outline: 0;
  display: block;
  width: 4em;
  height: 2em;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-wrapper-10 .tgl+.tgl-btn:after,
.checkbox-wrapper-10 .tgl+.tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}

.checkbox-wrapper-10 .tgl+.tgl-btn:after {
  left: 0;
}

.checkbox-wrapper-10 .tgl+.tgl-btn:before {
  display: none;
}

.checkbox-wrapper-10 .tgl:checked+.tgl-btn:after {
  left: 50%;
}

.checkbox-wrapper-10 .tgl-flip+.tgl-btn {
  padding: 2px;
  transition: all 0.2s ease;
  font-family: sans-serif;
  perspective: 100px;
}

.checkbox-wrapper-10 .tgl-flip+.tgl-btn:after,
.checkbox-wrapper-10 .tgl-flip+.tgl-btn:before {
  display: inline-block;
  transition: all 0.4s ease;
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 2em;
  font-weight: bold;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 4px;
}

.checkbox-wrapper-10 .tgl-flip+.tgl-btn:after {
  content: attr(data-tg-on);
  background: #586d80;
  transform: rotateY(-180deg);
}

.checkbox-wrapper-10 .tgl-flip+.tgl-btn:before {
  background: #e4745e;
  content: attr(data-tg-off);
}

.checkbox-wrapper-10 .tgl-flip+.tgl-btn:active:before {
  transform: rotateY(-20deg);
}

.checkbox-wrapper-10 .tgl-flip:checked+.tgl-btn:before {
  transform: rotateY(180deg);
}

.checkbox-wrapper-10 .tgl-flip:checked+.tgl-btn:after {
  transform: rotateY(0);
  left: 0;
  background: #66828e;
}

.checkbox-wrapper-10 .tgl-flip:checked+.tgl-btn:active:after {
  transform: rotateY(20deg);
}
</style>
