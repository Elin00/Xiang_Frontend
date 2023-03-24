<template>
  <div class="block">
    <span class="demonstration">開始時間: </span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="選擇日期"
      :disabled-date="disabledDate"
   
    />
  </div>
  <div class="block">
    <span class="demonstration">結束時間: </span>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="選擇日期"
      :disabled-date="disabledDate"
      
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");

// const shortcuts = [
//   {
//     text: "Today",
//     value: new Date(),
//   },
//   {
//     text: "Yesterday",
//     value: () => {
//       const date = new Date();
//       date.setTime(date.getTime() - 3600 * 1000 * 24);
//       return date;
//     },
//   },
//   {
//     text: "A week ago",
//     value: () => {
//       const date = new Date();
//       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
//       return date;
//     },
//   },
// ];

const disabledDate = (time: Date) => {
  return time.getTime() < Date.now();
};
</script>

<style>

</style>
