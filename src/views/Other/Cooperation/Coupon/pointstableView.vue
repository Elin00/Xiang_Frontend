<script setup>
import { useCouponDataStore } from "../../../../stores/CouponData.js";

const CouponData = useCouponDataStore();

</script>

<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">序列</th>
            <th scope="col">優惠碼</th>
            <th scope="col">積分</th>
            <th scope="col">打折</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in CouponData.result" :key="index">
            <th scope="row">{{ item.couponId }}</th>
            <td>{{ item.code }}</td>
            <td>{{ item.howPoint }}</td>
            <td>{{ item.discount }}折</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
table {
  text-align: center; 
}
</style>
