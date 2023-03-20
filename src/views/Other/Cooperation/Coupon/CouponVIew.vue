<script setup>
import { ref, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import pointstable from "./pointstableView.vue";

const activeLink = ref(0);

const moveUnderline = (index) => {
  activeLink.value = index;
};

const underlineLeft = computed(() =>
  activeLink.value === 0 ? "10px" : "130px"
);
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="material-icons-round" style="font-size: 100px">redeem</div>
      <div class="reward-nav">
        <RouterLink
          :to="{ name: 'other-CouponView-pointstable' }"
          class="reward-nav__link"
          @click.native="moveUnderline(0)"
          >積分表</RouterLink
        >
        <RouterLink
          :to="{ name: 'other-CouponView-UseCouponView' }"
          class="reward-nav__link"
          @click.native="moveUnderline(1)"
          >輸入優惠碼</RouterLink
        >
        <div
          :style="{ left: underlineLeft }"
          class="reward-nav__underline"
          style="width: 60px"
        ></div>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<style>
.reward-nav {
  display: flex;
  position: relative;
  margin: 20px 0 20px;
}

.reward-nav__link {
  display: block;
  font-size: 18px;
  color: #7a7a7a;
  padding: 15px 0;
  margin: 0 30px 0 0;
  position: relative;
  overflow: hidden;
}

a {
  text-decoration: none;
}

.reward-nav__link.active {
  color: #4a4a4a;
  font-weight: 500;
}

.reward-nav__underline {
  position: absolute;
  bottom: 0;
  height: 3px;
  border-radius: 3px;
  background: #40996c;
  will-change: left, width;
  transition: left 0.2s, width 0.2s;
}

.coupon-card {
  position: relative;
  width: 260px;
  height: 130px;
  overflow: unset;
  border-radius: 3px;
  margin: 0 0 15px;
  background: linear-gradient(
    to right,
    rgb(204, 148, 129),
    rgba(220, 184, 114, 0.8)
  );
}

.coupon-card__div {
  transform: skew(30deg);
  margin: 0 0 0 -140px;
  width: 100%;
  height: 100%;
}

.coupon-card__line {
  transform: skew(-30deg);
  position: absolute;
  z-index: 99;
  width: 2px;
  height: 130px;
  right: 60px;
  border-right: dashed 2px #fff;
}

.coupon-card__symbol {
  font-size: 55px !important;
  color: #fff;
  position: absolute;
  bottom: -6px;
  right: -100px;
}

.coupon-form__input-code {
  font-size: 14px;
  color: #9b9b9b;
  line-height: 1.4;
  width: 180px;
  height: 40px;
  border-radius: 3px;
  background: #fff;
  border: solid 1px #b3b3b3;
  padding: 0 12px;
  margin-right: 15px;
}

.coupon-form__btn {
  cursor: pointer;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 50px;
  padding: 10px 25px;
  display: inline;
  background-color: #ed5959;
  letter-spacing: 0.1em;
  transition: all 0.3s;
}
</style>
