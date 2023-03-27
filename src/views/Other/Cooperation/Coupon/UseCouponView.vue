<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useCustomerStore } from "../../../../stores/CustomerData";
import { useCouponDataStore } from "../../../../stores/CouponData.js";
import axios from 'axios'


const CustomerData = useCustomerStore();
const CouponData = useCouponDataStore();

const router = useRouter();
router.push({ name: "other-CouponView-pointstable-CouponpageavailableView" });


const discount = ref('');  //顯示折扣碼
const couponCode = ref('');
const myCoupons = ref([]);   //使用優惠卷
const usedCoupons = ref([]);  //已使用的優惠卷
const applyAndClaimCoupon = async () => {
  if (couponCode.value) {
    const matchedCoupon = CouponData.result.find(coupon => coupon.code === couponCode.value);

    if (matchedCoupon) {
      const newCoupon = {
        code: matchedCoupon.code,
        discount: matchedCoupon.discount,
      };
      discount.value = matchedCoupon.discount;

      try {
        const response = await axios.get(`https://localhost:7073/api/Client/claimCoupon/${couponCode.value}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CustomerData.token}`,
          },
        });

        if (response.data.success) {
          myCoupons.value.push(newCoupon);
          localStorage.setItem('myCoupons', JSON.stringify(myCoupons.value));
          couponCode.value = '';
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          console.error(error);
        }
      }
    }
  };
}
const isCouponValid = computed(() => myCoupons.value.length > 0);

const useCoupon = async (coupon) => {
  const matchedCoupon = CouponData.result.find(c => c.code === coupon.code);

  if (matchedCoupon) {
    const couponId = matchedCoupon.couponId;

    const response = await axios.post(
      `https://localhost:7073/api/Client/${couponId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CustomerData.token}`,
        },
      }
    );

    if (response.status === 200) {
      const index = myCoupons.value.indexOf(coupon);
      if (index > -1) {
        myCoupons.value.splice(index, 1);
      }
      usedCoupons.value.push(coupon);
      localStorage.setItem('myCoupons', JSON.stringify(myCoupons.value));
      localStorage.setItem('usedCoupons', JSON.stringify(usedCoupons.value));
      console.log(response.data);
      alert(response.data);
    } else {
      alert(response.data);
    }

  }
};
onMounted(() => {
  const storedCoupons = localStorage.getItem('myCoupons');
  if (storedCoupons) {
    myCoupons.value = JSON.parse(storedCoupons);
  }
  const storedUsedCoupons = localStorage.getItem('usedCoupons');
  if (storedUsedCoupons) {
    usedCoupons.value = JSON.parse(storedUsedCoupons);
  }
});
</script>
<template>
  <div class="coupon_group mt-5">
    <div class="coupon-card">
      <div class="coupon-card__div">
        <div class="coupon-card__line"></div>
        <p class=" coupon-card__symbol">{{ discount }}%</p>
      </div>
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
        <li><router-link :to="{ name: 'other-CouponView-pointstable-CouponpageavailableView' }" class="mb-2 ml-2"
            style="padding-right: 25px; margin-left: -32px">
            可使用
          </router-link></li>
        <li><router-link :to="{ name: 'other-CouponView-pointstable-UsedcouponpageView' }">已使用</router-link></li>
      </ul>
      <router-view :is-coupon-valid="isCouponValid" :my-coupons="myCoupons" :used-coupons="usedCoupons"
        :use-coupon="useCoupon" />

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