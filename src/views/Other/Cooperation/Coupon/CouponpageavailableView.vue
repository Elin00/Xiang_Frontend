<script setup>
const props = defineProps({
  isCouponValid: Boolean,
  myCoupons: Array,
  useCoupon: Function,
});
</script>

<template>
  <div>
    <ul>
      <li v-for="(coupon, index) in myCoupons" :key="index" class="coupon-item">
        <div class="coupon-info">
          <p>優惠卷代碼：{{ coupon.code }}</p>
          <p>折扣：{{ coupon.discount }}%</p>
        </div>
      </li>
    </ul>
  </div>
</template>
  