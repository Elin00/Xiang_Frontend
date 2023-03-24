<script setup>
//Naive
import { NCard, NButton, NDatePicker, NTable } from "naive-ui";

import { defineComponent, ref } from "vue";
import { useOrdersDataStore } from "../../../../stores/ordersData.js";
const storeOrdersData = useOrdersDataStore();



</script>

<template>
   <div class="container">
      <div class="row">

         <div class="col-10">
            <section>
               <NTable :bordered="true" :single-line="false" class="my-table">
                  <thead class="my-table-header">
                     <tr>
                        <th>訂單編號</th>
                        <th>房型種類</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>取消時間</th>
                        <th>優惠券</th>
                        <th>總價</th>
                     </tr>
                  </thead>
                  <tbody class="my-table-tbody">
                     <tr v-for="(order, index) in storeOrdersData.ocancel" :key="index">
                        <td>{{ order.tradeNO }}</td>
                        <td>{{ order.CategoryName }}</td>
                        <td>{{ order.StartDate }}</td>
                        <td>{{ order.EndDate }}</td>
                        <td>{{ order.CancelDate }}</td>
                        <td>{{ order.Discount }}%</td>
                        <td>{{ order.Price }}</td>
                        </tr>
                  </tbody>
                  
               </NTable>
               <hr class="style-two">
               <p style="color:cadetblue; font-weight: 400;">
                  訂單已成功取消，退刷款項約需7-10個工作天 <br>
                  若有任何疑問或指教請不吝與我們聯繫。
               </p>
            </section>
            <hr class="style-two">
         </div>
      </div>
   </div>
</template>

<style scoped>
NCard {
   max-width: 300px;
}

.container {
   border: 10px;
   border-color: black;
}

img {
   size-adjust: 50%;
}

hr.style-two {
   border: 0;
   height: 2px;
   background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

.my-table {
   border-color: gray;
}

.my-table-header th {
   background-color: lightgray;
   border-color: gray;
}

.my-table-tbody tr td {
   border-color: gray;
}
</style>