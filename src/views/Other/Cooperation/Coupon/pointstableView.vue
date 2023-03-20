<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";

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
          <tr v-for="(item, index) in result" :key="index">
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
