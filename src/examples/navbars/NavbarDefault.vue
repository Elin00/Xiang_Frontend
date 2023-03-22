<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
import { useCustomerStore } from "../../stores/CustomerData.js";
import { useSuppliersDataStore } from "../../stores/SuppliersData.js";

// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";

const CustomerStore = useCustomerStore();
const Suppliersstore = useSuppliersDataStore();

const props = defineProps({
  action: {
    default: () => ({
      color: "black",
      label1: "登入",
    }),
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});
// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);
</script>
<template>
  <nav class="navbar navbar-expand-lg top-0 p-0" style="margin: 0px -24px" :class="{
    'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-':
      props.transparent,
    ' blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0  ':
      props.sticky,
    'navbar-light bg-white py-3': props.light,
    ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
  }">
  <div :class="
    props.transparent || props.light || props.dark
      ? 'container-fluid'
      : 'container-fluid '
  ">
      <RouterLink class="navbar-brand d-none d-md-block" :class="[
        (props.transparent && textDark.value) || !props.transparent
          ? 'text-dark font-weight-bolder ms-sm-3'
          : 'text-white font-weight-bolder ms-sm-3',
      ]" :to="{ name: 'presentation' }" rel="tooltip" title="Designed and Coded by Creative Tim"
        data-placement="bottom">
        <span style="font-size: 36px">想享Xiang</span>
      </RouterLink>
      <RouterLink class="navbar-brand d-block d-md-none" :class="
        props.transparent || props.dark
          ? 'text-white'
          : 'font-weight-bolder ms-sm-3'
      " to="/" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom">
        想享Xiang
      </RouterLink>
      <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation"
        aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <RouterLink :to="{ name: 'RoomGuideView' }" class="py-3 ps-3 d-flex" id="title"
            style="padding-right: 15px; color: aliceblue; font-size: 24px" :class="[
              (props.transparent && textDark.value) || !props.transparent
                ? 'text-dark font-weight-bolder ms-sm-3'
                : 'text-white font-weight-bolder ms-sm-3',
            ]" href="#" onclick="smoothToPricing('pricing-soft-ui')">瀏覽空間</RouterLink>
          <RouterLink :to="{ name: 'cooperation' }" class="py-3 ps-3 d-flex" id="title"
            style="padding-right: 15px; color: aliceblue; font-size: 24px" :class="[
              (props.transparent && textDark.value) || !props.transparent
                ? 'text-dark font-weight-bolder ms-sm-3'
                : 'text-white font-weight-bolder ms-sm-3',
            ]">加入合作空間</RouterLink>
        </ul>
        <ul class="navbar-nav d-lg-block">
          <li class="nav-item dropdown dropdown-hover">
            <a id="menu" class="nav-link d-flex align-items-center cursor-pointer" data-bs-toggle="dropdown"
              aria-expanded="false" data-bs-offset="10,20">
              <div style="
                    border-radius: 40%;
                    background-color: rgba(255, 255, 255, 0.7);
                  ">
                <span class="material-icons" style="font-size: 3em">
                  manage_accounts
                </span>
              </div>
            </a>

            <!-- 沒登入時選單 -->
            <div v-if="!CustomerStore.loggedIn && !Suppliersstore.loggedIn" id="dropdown"
              class="dropdown-menu dropdown-menu-end mt-0 mt-lg-3 p-3 border-radius-lg"
              style="margin-top: 4rem !important" aria-labelledby="dropdownMenuOffset">
              <div class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color" data-bs-toggle="modal"
                data-bs-target="#Login">
                登入
              </div>

              <div class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color" data-bs-toggle="modal"
                data-bs-target="#Register">
                註冊
              </div>

              <RouterLink :to="{ name: 'other-CouponView' }" class="dropdown-item py-3 ps-3 border-radius-md"
                :style="action.color" :href="action.route">領取優惠卷
              </RouterLink>
              <RouterLink :to="{ name: 'questions' }" class="dropdown-item py-3 ps-3 border-radius-md"
                :style="action.color">常見問答</RouterLink>
              <div v-if="CustomerStore.loggedIn"></div>
            </div>

            <!-- 登入時換取顧客帳戶 -->
            <div v-if="CustomerStore.loggedIn" id="dropdown"
              class="dropdown-menu dropdown-menu-end mt-0 mt-lg-3 p-3 border-radius-lg"
              style="margin-top: 4rem !important" aria-labelledby="dropdownMenuOffset">
              <!-- <div v-if="!CustomerStore.loggedIn" class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color"
                    data-bs-toggle="modal" data-bs-target="#Login">登入
                  </div>

                  <div v-if="!CustomerStore.loggedIn" class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color"
                    data-bs-toggle="modal" data-bs-target="#Register">註冊
                  </div> -->
              <div v-if="CustomerStore.loggedIn">
                <span class="dropdown-item py-3 ps-3 border-radius-md"
                  style="color: green; border-bottom: 1px solid grey">
                  {{ CustomerStore.Name }}
                </span>
              </div>
              <RouterLink v-if="CustomerStore.loggedIn" :to="{ name: 'member-orders' }"
                class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color">我的預定
              </RouterLink>
              <RouterLink v-if="CustomerStore.loggedIn" :to="{ name: 'member-memberdetail' }"
                class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color">我的帳戶
              </RouterLink>
              <RouterLink :to="{ name: 'other-CouponView' }" class="dropdown-item py-3 ps-3 border-radius-md"
                :style="action.color" :href="action.route">領取優惠卷
              </RouterLink>
              <RouterLink :to="{ name: 'questions' }" class="dropdown-item py-3 ps-3 border-radius-md"
                :style="action.color">常見問答</RouterLink>
              <div v-if="CustomerStore.loggedIn">
                <span class="dropdown-item py-3 ps-3 border-radius-md" @click="CustomerStore.logout"
                  :style="action.color">
                  登出
                </span>
              </div>
            </div>

            <!-- 業者登入時換取業者帳戶 -->
            <div v-if="Suppliersstore.loggedIn" id="dropdown"
              class="dropdown-menu dropdown-menu-end mt-0 mt-lg-3 p-3 border-radius-lg"
              style="margin-top: 4rem !important" aria-labelledby="dropdownMenuOffset">
              <div v-if="Suppliersstore.loggedIn">
                <span class="dropdown-item py-3 ps-3 border-radius-md"
                  style="color: green; border-bottom: 1px solid grey">
                  {{ Suppliersstore.name }}
                </span>
              </div>
              <RouterLink v-if="Suppliersstore.loggedIn" :to="{ name: 'supplierDetails' }"
                class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color">我的帳戶
              </RouterLink>
              <RouterLink v-if="Suppliersstore.loggedIn" :to="{ name: 'addRoom' }"
                class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color">我的空間
              </RouterLink>
              <div v-if="Suppliersstore.loggedIn">
                <span class="dropdown-item py-3 ps-3 border-radius-md" @click="Suppliersstore.SLogout"
                  :style="action.color">
                  登出
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
<style></style>
