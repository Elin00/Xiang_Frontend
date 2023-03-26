<template>
    <div>
      <ul>
        <li v-for="(coupon, index) in usedCoupons" :key="index" class="coupon-item">
          <div class="coupon-info">
            <p>優惠卷代碼：{{ coupon.code }}</p>
            <p>折扣：{{ coupon.discount }}%</p>
          </div>
          <span class="used-coupon-label">已使用</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      usedCoupons: Array,
    },
  };
  </script>
  
  <style>
  .coupon-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .used-coupon-label {
    color: #999;
    font-size: 14px;
  }
  </style>
  