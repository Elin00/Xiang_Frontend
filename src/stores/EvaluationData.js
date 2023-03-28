import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import axios from 'axios';

export const useEvaluationDataStore = defineStore("EvaluationData", () => {
  const number = ref();
  
  const EvaluationData = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7073/api/TEvaluations/${id}`);
      number.value = response.data.map(review => ({
        customerId: review.evaluationId,
        name: review.customerName,
        rating: review.star,
        time: review.date,
        title : review.title,
        review: review.description
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const numberOfReviews = computed(() => {
    if (number.value === undefined) {
      return 0;
    } else {
      return number.value.length;
    }
  });

  return {number,
    EvaluationData ,
    numberOfReviews
  }
});