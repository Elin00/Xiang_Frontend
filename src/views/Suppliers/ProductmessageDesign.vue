<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useCustomerStore } from "../../stores/CustomerData.js";

const CustomerData = useCustomerStore();

const productId = 2;
const showFeedbackForm = ref(true);
const title = ref("");
const rating = ref(0);
// const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwianRpIjoiMmIxYmVkMGUtNTczZS00NjFhLTljZTEtMjA5ZGRhNjI0N2FkIiwiaWF0IjoiMjAyMy8zLzE5IOS4iuWNiCAxMDo1NjoyMyIsIk5hbWUiOiLmrLjlj6YiLCJlbWFpbCI6ImMyOTczNDU3QGdtYWlsLmNvbSIsImV4cCI6MTY3OTgyODE4MywiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCJ9.zfT0VzTvpN4Z6n8QgUGiHA17_1kfkNTH54HTuQNa2V0";
//點擊星星
const setRating = (n) => {
  rating.value = n;
};
const selectedTitle = ref("");
const Titles = async () => {
  try {
    const response = await axios.get(
      "https://localhost:7073/api/TEvaluations/Title"
    );
    // result.title = response.data.map(item => item.titleName);
    result.title = response.data;
  } catch (error) {
    console.error("無法獲取標題:", error);
  }
};
onMounted(() => {
  Titles();
});

const result = reactive({
  title: [],
  description: "",
  customerName: "",
  star: "",
});

const submitFeedback = () => {
  // 在此處儲存留言資料發送到 API。
  try {
    const response = axios.post(
      `https://localhost:7073/api/TEvaluations`,
      {
        title: selectedTitle.value.toString(),
        description: result.description,
        customerName: CustomerData.Name,
        star: rating.value,
      },
      {
        headers: {
          // Authorization: `Bearer ${token1}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  // 重置表單
  title.value = "";
  rating.value = 0;
  result.description = "";

  // 隱藏留言表單
  showFeedbackForm.value = false;
};

</script>
<template>
  <div class="feedback-wall">
    <div v-if="showFeedbackForm" class="feedback-form">
      <h2>留下您的評論</h2>
      <label>顧客名字: {{ CustomerData.Name }}</label>
      <label
        >標題:
        <select v-model="selectedTitle">
          <option v-for="t in result.title" :key="t.titleId" :value="t.titleId">
            {{ t.titleName }}
          </option>
        </select>
      </label>
      <label
        >評分:
        <div class="rating">
          <span v-for="n in 5" :key="n" @click="setRating(n)">
            <i :class="['star', n <= rating ? 'filled' : '']">&#9733;</i>
          </span>
        </div>
      </label>
      <label>評論: <textarea v-model="result.description"></textarea></label>
      <button @click="submitFeedback">儲存</button>
    </div>
  </div>
</template>

<style scoped>
.feedback-wall {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.feedback-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

.rating {
  display: inline-block;
}

.star {
  cursor: pointer;
  color: #ccc;
}

.star.filled {
  color: #f1c40f;
}
</style>
