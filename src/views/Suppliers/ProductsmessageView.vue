<script setup>
import { ref,onMounted,computed  } from 'vue';
import axios from 'axios';

const Evaluation = ref([]);
onMounted(async () => {
  try {
    const productId = 2; // 用正確的值替換
    const response = await axios.get(`https://localhost:7073/api/TEvaluations/${productId}`);
    Evaluation.value = response.data.map(review => ({
      customerId: review.evaluationId,
      name: review.customerName,
      rating: review.star,
      time: review.date,
      review: review.description
    }));
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }
});
const numberOfReviews = computed(() => Evaluation.value.length);

</script>

<template>
  <div class="container">
    <div class="row mt-0"  v-for="review in Evaluation" :key="review.customerId">
      <div class="material-icons col-1 d-flex justify-content-center" style="font-size: 20px">
        account_circle
      </div>
      <div class="col-11">
        {{ review.name }}
        <div>
          <span v-for="i in 5" :key="i">
            <i :class="i <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
          </span>
        </div>
        <div> {{review.time}} || 規格 :{{ review.title}} </div>
        <div> 評價 : {{review.review}}</div>
      </div>
    </div>
  </div>
</template>