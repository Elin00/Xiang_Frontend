import { defineStore } from "pinia";
import { reactive, onMounted } from "vue";
import axios from "axios";
import { useCustomerStore } from "../stores/CustomerData.js";

export const useCouponDataStore = defineStore("CouponData", () => {
  const result = reactive([]);
  const point = reactive([]);
  const CustomerData = useCustomerStore();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7073/api/Client/ListCoupon"
      );
      result.push(...response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const CheckPointData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7073/api/Client/Coupons",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CustomerData.token}`,
          },
        }
      );
      point.push(...response.data);
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
    fetchData();
    CheckPointData();
  });

  return { result, point, fetchData, CheckPointData };
});
