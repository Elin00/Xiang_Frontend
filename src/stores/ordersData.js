import { reactive, ref, onMounted, watch } from "vue";
import { defineStore } from "pinia";
import router from "./../router/index.js";

import { useCustomerStore } from "../stores/CustomerData.js";
import axios from "axios";

//第一個參數就是 id 名稱，餵給 pinia 使用的
export const useOrdersDataStore = defineStore("ordersData", () => {
  const CustomerData = useCustomerStore();
  const o = reactive([
    // tradeNO: "",   //訂單編號
    // StartDate: "",  //開始時間
    // EndDate: "",  //結束時間
    // Price: "", //總價格
    // CategoryName: "",
    // Discount: "",
  ]);
  const ocancel = reactive([]);
  const oendDate = reactive([])
  const Cancel = ref(false);
  const Delete = ref(false);
  const ordersChanged = ref(true);

  const orderinformation = async () => {
   if (o.length != 0) {
      o.length = 0; // 清空 o
    }
    if (oendDate.length != 0) {
      oendDate.length = 0; // 清空 ocancel
    }
    if (ocancel.length != 0) {
      ocancel.length = 0; // 清空 ocancel
    }
    await axios.get(`https://localhost:7073/api/Orders/queryAll/${CustomerData.id}`)
    .then((response) => {
        const orders = response.data;

        orders.forEach((order) => {
         const endDate = new Date(Date.parse(order.endDate));
          if (order.cancelDate === null && endDate > new Date() ) {
            const item = {
              tradeNO: order.tradeNo,
              StartDate: order.startDate,
              EndDate: order.endDate,
              Price: order.price,
              CategoryName: order.categoryName,
              Discount: order.discount,
            };
            o.push(item);
          } else if(endDate < new Date()){
            const item = {
               tradeNO: order.tradeNo,
               StartDate: order.startDate,
               EndDate: order.endDate,
               Price: order.price,
               CategoryName: order.categoryName,
               Discount: order.discount,
               roomId :order.roomId
             };
             oendDate.push(item)
            console.log(oendDate);
          }
          else {
            const item = {
              tradeNO: order.tradeNo,
              StartDate: order.startDate,
              EndDate: order.endDate,
              CancelDate: order.cancelDate,
              Price: order.price,
              CategoryName: order.categoryName,
              Discount: order.discount,
            };
            ocancel.push(item);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
      ordersChanged.value = false; // 更新成功後設為 false
  };

// 昱廷教學區
//   axios.get(`url/${id}`)
//   .then(res=>{
//     console.log(res.data);
//   }).catch(err=>{
//     console.log(err);
//   })

//  axios.post(`url`,{
//    account: "",
//    password : "",
//  }).then().catch()

  //一開始先寫入資料，後來判斷是否有更新
  onMounted(() => {
    orderinformation();
    watch(
      ordersChanged,
      async (newValue, oldValue) => {
        if (newValue !== oldValue) {
          await orderinformation();
        }
      },
      { flush: 'sync', immediate: false }
    ).value;
  });
  
  ///取消訂單
  const CancelDate = async () => {
    if (confirm("再想一下，是否要取消預定?")) {
      Cancel.value = true;

      router.push({ name: "member-orders-cancel" });
      try {
        axios.put(`https://localhost:7073/api/Orders/cancel/${o[0].tradeNO}`);
        ordersChanged.value = !ordersChanged.value; // 更改 ordersChanged 的值
       
      } catch (error) {
        console.log(error);
      }
    } else {
      Cancel.value = false;
    }
  };
  ///刪除訂單
  const DeleteDate = async () => {
    if (confirm("確定刪除?")) {
      Delete.value = true;
      axios
        .delete(`https://localhost:7073/api/Orders/delete/${o[0].tradeNO}`)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Delete.value = false;
    }
  };


  
  return { o, Cancel, CancelDate, orderinformation, DeleteDate, ocancel,oendDate };
});
