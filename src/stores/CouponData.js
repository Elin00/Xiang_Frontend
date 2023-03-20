import { defineStore, } from "pinia";
import {reactive,onMounted  } from 'vue';



export const useCouponDataStore = defineStore("CouponData", () => {
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
  return { result, fetchData };
});