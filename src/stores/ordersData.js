import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

//第一個參數就是 id 名稱，餵給 pinia 使用的
export const useOrdersDataStore = defineStore('ordersData', () => {
   const OrderID = ref('');
   const OrderDate = ref('');
   const ReturnDate = ref('');
   const CouponID = ref('');
   const Discount = ref('');
   // const creditCard = reactive([]);

   // const addCreditCard = (newCardData) => {
   //    creditCard.push(newCardData);
   // }
   const CancelDate = (CcDate) => {
      if (confirm('是否要取消預定?'))
         // creditCard.splice(creditCard.indexOf(rmCardData), 1)
   }

   return { OrderID, OrderDate, ReturnDate, CouponID, Discount, CancelDate }
})