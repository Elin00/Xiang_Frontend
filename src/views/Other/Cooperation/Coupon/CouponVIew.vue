<script setup>
import { ref } from "vue";

const underlineRef = ref(null);
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="material-icons-round" style="font-size: 100px">redeem</div>
      <div class="reward-nav">
        <a class="reward-nav__link">積分表</a>
        <a class="reward-nav__link active">輸入優惠碼</a>
        <div ref="underline" class="reward-nav__underline" style="left: 10px; width: 60px"></div>
      </div>
      <div class="coupon_group mt-5">
        <div class="coupon-card">
          <div class="coupon-card__div">
            <div class="coupon-card__line"></div>
            <p class="material-icons coupon-card__symbol">%</p>
          </div>
        </div>
        <form>
          <input type="text" class="coupon-form__input-code" placeholder="輸入優惠卷或折扣代碼" />
          <button type="button" class="coupon-form__btn">領取</button>
        </form>
      </div>
      <div class="coupon-record mt-5 ">
        <h6>我的優惠券</h6>
        <ul class="d-flex  " style="border-bottom: 1px solid black; list-style: none;">
          <li class="mb-2 ml-2" style="padding-right: 25px; margin-left: -40px;"><a>可使用</a></li>
          <li><a>已使用</a></li>
        </ul>
        <div style="border-bottom: solid 2px #e0e0e0; padding-bottom">你還沒有可使用的優惠卷</div>
      </div>
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
  background: linear-gradient(to right,
      rgb(204, 148, 129),
      rgba(220, 184, 114, 0.8));
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
