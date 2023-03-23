import { reactive, ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import router from './../router/index.js'
// import { fetchDataFromDatabase } from '@/api/database'
import { useCustomerStore } from "../stores/CustomerData.js"
import axios from 'axios'
import moment from 'moment'
import { parseDate } from 'element-plus'
import { parseStringStyle } from '@vue/shared'
import { c } from 'naive-ui'



//第一個參數就是 id 名稱，餵給 pinia 使用的
export const useOrdersDataStore = defineStore('ordersData', () => {
   const CustomerData = useCustomerStore();
   const o = reactive([
      // tradeNO: "",   //訂單編號
      // StartDate: "",  //開始時間
      // EndDate: "",  //結束時間
      // Price: "", //總價格
      // CategoryName: "",
      // Discount: "",
   ])
   const ocancel = reactive([])
   const Cancel = ref(false);
   const Delete = ref(false);


   

   const orderinformation = async () =>
      await axios.get(`https://localhost:7073/api/Orders/queryAll/${CustomerData.id}`)
         .then(response => {
            const orders = response.data;
            // console.log(orders);
            orders.forEach(order => {
               if (order.cancelDate === null) {
                  const item =
                  {
                     tradeNO: order.tradeNo,
                     StartDate: order.startDate,
                     EndDate: order.endDate,
                     Price: order.price,
                     CategoryName: order.categoryName,
                     Discount: order.discount,
                  }
                  o.push(item)
               }            
               else{
                  const item = 
                  {
                     tradeNO: order.tradeNo,
                     StartDate: order.startDate,
                     EndDate: order.endDate,
                     CancelDate: order.cancelDate,
                     Price: order.price,
                     CategoryName: order.categoryName,
                     Discount: order.discount,
                  }
                  ocancel.push(item)
               }
            });
            console.log(o);
            console.log(ocancel);
         })
         .catch(error => {
            console.log(error);
         });

        
   onMounted(() => {
      orderinformation();
   });

   const CancelDate = async () => {
      if (confirm('再想一下，是否要取消預定?')) {
         Cancel.value = true;
         router.push({ name: 'member-orders-cancel' });
         try{
         axios.put(`https://localhost:7073/api/Orders/cancel/${o[0].tradeNO}`)
         .then((response)=>{
               console.log(response);
         })}catch(error){
               console.log(error);
         }
      }
      else {
         Cancel.value = false;
      }
   }

const DeleteDate = async()=>{
   if(confirm('確定刪除?')){
      Delete.value = true;
   }
   else{
      Delete.value = false;
   }
}
   return { o, Cancel, CancelDate, orderinformation,DeleteDate}
})

// export default defineComponent({
//    setup() {
//       const store = useStore()
//       const state = reactive({
//          data: null,
//          error: null,
//          // isLoading: false,
//          Cancel: false,
//       })

//       const fetchData = async () => {
//          // state.isLoading = true
//          Cancel.value = true;
//          try {
//             const data = await fetchDataFromDatabase()
//             state.data = data
//          } catch (error) {
//             state.error = error
//          } finally {
//             state.isLoading = false
//          }
//       }

//       return {
//          state,
//          fetchData,
//       }
//    },
// })