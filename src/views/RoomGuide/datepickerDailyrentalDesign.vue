<template>
  <div class="block">
    <span class="demonstration">開始時間: </span>
    <el-date-picker v-model="value1" type="date" placeholder="選擇日期" :disabled-date="disabledDate" />
  </div>
  <div class="block">
    <span class="demonstration">結束時間: </span>
    <el-date-picker v-model="value2" type="date" placeholder="選擇日期" :disabled-date="disabledDate2" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from "vue";

const value1 = ref("");
const value2 = ref("");

const disabledDate = (time: Date) => {
  return time.getTime() < Date.now();
};
const disabledDate2 = (time: Date) => {
  return time.getTime().toString() < value1.value;
};

const emit = defineEmits(["update-values"]);

watch([value1, value2], () => {
  emit("update-values", { value1: value1.value, value2: value2.value });
});
</script>

<style></style>
