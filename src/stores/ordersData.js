import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import router from './../router/index.js'

//第一個參數就是 id 名稱，餵給 pinia 使用的
export const useOrdersDataStore = defineStore('ordersData', () => {
   const OrderID = ref('');
   const OrderDate = ref('');
   const ReturnDate = ref('');
   const CouponID = ref('');
   const Discount = ref('');
   const Cancel = ref(false);

   const CancelDate = () => {
      if (confirm('是否要取消預定?')) {
         Cancel.value = true;
         console.log("善加利用這個查看目前Cancel的狀態: " + Cancel.value);
         // OrderID.value=100;
         router.push({ name: 'member-orders-cancel' });
      }
      else {
         Cancel.value = false;
         console.log("善加利用這個查看目前Cancel的狀態: " + Cancel.value);
      }
   }

   return { OrderID, OrderDate, ReturnDate, CouponID, Discount, CancelDate }
})