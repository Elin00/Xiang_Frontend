<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";

//Vue Material Kit 2 components
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";


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
      <!-- <a href="https://www.creative-tim.com/product/vue-material-kit-pro"
                                                                              class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block">Buy Now</a> -->
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
            ]" href="#" onclick="smoothToPricing('pricing-soft-ui')" @mouseover="ChangeColor">瀏覽空間</RouterLink>
          <RouterLink :to="{ name: 'cooperation' }" class="py-3 ps-3 d-flex" id="title"
            style="padding-right: 15px; color: aliceblue; font-size: 24px" :class="[
              (props.transparent && textDark.value) || !props.transparent
                ? 'text-dark font-weight-bolder ms-sm-3'
                : 'text-white font-weight-bolder ms-sm-3',
            ]" href="#">加入合作空間</RouterLink>
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
            <div id="dropdown" class="dropdown-menu dropdown-menu-end mt-0 mt-lg-3 p-3 border-radius-lg"
              style="margin-top: 4rem !important" aria-labelledby="dropdownMenuOffset">
              <RouterLink :to="{ name: 'about' }" class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color"
                :href="action.route" data-bs-toggle="modal" data-bs-target="#Login"><span>{{ action.label1 }}</span>
              </RouterLink>
              <RouterLink :to="{ name: 'rentroomView' }" class="dropdown-item py-3 ps-3 border-radius-md"
                :style="action.color" :href="action.route" data-bs-toggle="modal" data-bs-target="#Register">註冊
              </RouterLink>
              <a class="dropdown-item py-3 ps-3 border-radius-md" :style="action.color" href="#pricing-soft-ui"
                onclick="smoothToPricing('pricing-soft-ui')">領取優惠</a>
              <RouterLink :to="{ name: 'questions' }" class="dropdown-item py-3 ps-3 border-radius-md"
                :style="action.color" onclick="smoothToPricing('pricing-soft-ui')">常見問答</RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 註冊彈出視窗 -->
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
                  <form role="form" class="text-start">
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">姓名</label><!--v-if--><input id="name" type="name"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">電子信箱</label><!--v-if--><input id="email"
                        type="email" class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">電話</label><!--v-if--><input id="phone" type="phone"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">密碼</label><!--v-if--><input id="password" type="password"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="form-check" style="padding-left: 0px">
                      <MaterialCheckbox id="terms" checked>我已閱讀並同意 想享<a href="#" style="color: green">各項條款</a>
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
                        <a class="btn btn-link px-3 " href="javascript:;">
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
                      登入
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <div class="input-group input-group-outline my-3">
                      <label class="form-label" data-bs-toggle="modal">電子信箱</label><!--v-if--><input id="email"
                        type="email" class="form-control form-control-md" placeholder="" isrequired="true" />
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">密碼</label><!--v-if--><input id="password" type="password"
                        class="form-control form-control-md" placeholder="" isrequired="true" />
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
                    <div class="row mt-3">
                      <div class="col-2 text-center ms-auto">
                        <a class="btn btn-link px-3 " href="javascript:;">
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


  <!-- End Navbar -->
</template>
<style></style>
