<script setup>
import { ref, onMounted, reactive } from "vue";
import { useCouponDataStore } from "../../../../stores/CouponData.js";
import axios from 'axios'



const result = reactive([]);

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://localhost:7073/api/Client/ListCoupon"
    );
    result.push(...response.data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);
const discount = ref("");
const couponCode = ref("");
const isCouponValid = ref(false);
const myCoupons = reactive([]);


const applyAndClaimCoupon = async () => {
  try {
    // 领取优惠券
    const response = await axios.get("https://localhost:7073/api/Client/claimCoupon", {
      couponCode: couponCode.value,
    });

    if (response.data.success) {
      // 应用优惠券
      const foundCoupon = result.find(coupon => coupon.code === couponCode.value);

      if (foundCoupon) {
        discount.value = foundCoupon.discount;
        isCouponValid.value = true;
      } else {
        isCouponValid.value = false;
      }
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};



</script>
<template>
  <div class="coupon_group mt-5">
    <div class="coupon-card" v-if="isCouponValid">
      <div class="coupon-card__div">
        <div class="coupon-card__line"></div>
        <p class=" coupon-card__symbol">{{ discount }}%</p>
      </div>
    </div>
    <div v-else>
      <p>請輸入正確優惠卷代碼。</p>
    </div>
    <form>
      <input type="text" class="coupon-form__input-code" placeholder="輸入優惠卷" v-model="couponCode" />
      <button type="button" class="coupon-form__btn" @click="applyAndClaimCoupon">
        領取
      </button>
    </form>
  </div>
  <div class="coupon-record mt-5">
    <div class="coupon-record mt-5">
      <h6>我的優惠券</h6>
      <ul class="d-flex" style="border-bottom: 1px solid black; list-style: none">
        <li class="mb-2 ml-2" style="padding-right: 25px; margin-left: -32px">
          可使用
        </li>
        <li><a>已使用</a></li>
      </ul>
      <div style="border-bottom: solid 2px #e0e0e0; padding-bottom">
        <ul>
          <p v-if="!isCouponValid">目前沒有可用的優惠卷</p>
          <li v-if="isCouponValid" v-for="(coupon, index) in myCoupons" :key="index">
            <div class="coupon-item">
              <div class="coupon-info">
                <span>優惠碼：{{ coupon.code }}</span>
                <span>折扣：{{ coupon.discount }}%</span>
              </div>
              <button type="button" class="use-coupon-btn">使用</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style>
.coupon-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.coupon-info {
  display: flex;
  flex-direction: column;
}

.use-coupon-btn {
  background-color: #3498db;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.use-coupon-btn:hover {
  background-color: #2980b9;
}
</style>