<template>
  <el-row>
    <el-col :span="8">
      <el-select v-model="value" class="material-icons" placeholder="location_on選取城市" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-button @click="showData = !showData" class="mb-3" style="padding: 19px 50px">
        選擇日期
      </el-button>
      <div v-show="showData">
        <el-date-picker v-model="value1" type="date" placeholder="請選擇時間" :disabled-date="disabledDate" size="default" />
      </div>
      <p v-if="selectedDate">您選擇的日期是 {{ selectedDate }}</p>
    </el-col>
    <el-col :span="8">
      <el-button @click="showSlider = !showSlider" class="mb-3" style="padding: 19px 50px">
        <span>{{ selectedNum[0] }}~{{ selectedNum[1] }}+</span>
      </el-button>
      <div v-show="showSlider" class="slider-container">
        <div class="w-100" style="background-color: white">
          <el-slider v-model="selectedNum" range show-stops :max="60" />
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <el-button type="primary" @click="">搜尋</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const showData = ref(false);
const value1 = ref("");
const selectedDate = ref("");
const selectedNum = ref([1, 60]);
const showSlider = ref(false);

const value = ref("");
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now();
};

function onSelectDate() {
  let selectedDateObj = new Date(value1.value); // 將選擇的時間轉換為 JavaScript 的日期物件
  let formattedDate =
    selectedDateObj.getFullYear() +
    "/" +
    (selectedDateObj.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    selectedDateObj.getDate().toString().padStart(2, "0"); // 格式化日期字串為 yyyy/mm/dd
  console.log(formattedDate); // 輸出格式化後的日期字串
  selectedDate.value = formattedDate; // 將格式化後的日期字串儲存至 Vue.js 的 data 中
}

watch(value1, () => {
  if (value1.value !== "") {
    onSelectDate();
  }
});
const options = [
  {
    value: "任何地區",
    label: "任何地區",
  },
  {
    value: "台南市",
    label: "台南市",
  },
  {
    value: "台中市",
    label: "台中市",
  },
  {
    value: "台北市",
    label: "台北市",
  },
];
</script>
<style>
.selected-num {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
</style>
