<script setup>
//Naive

import { NButton, NTable } from "naive-ui";
import { useOrdersDataStore } from "../../../../stores/ordersData.js";


const storeOrdersData = useOrdersDataStore()

</script>

<template>
   <div class="container">
      <div class="row">
         <div class="col-10">
            <!-- <div class="col-xs-4 col-md-6 col-lg-10"> -->
            <section>
               <NTable :bordered="true" :single-line="false" class="my-table">
                  <thead class="my-table-header">
                     <tr>
                        <th>訂單編號</th>
                        <th>房型種類</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>優惠券折扣</th>
                        <th>總價</th>
                        <th>取消訂單</th>
                     </tr>
                  </thead>
                  <tbody class="my-table-tbody">
                     <tr v-for="order in storeOrdersData.o" :key="order.tradeNO">
                        <td>{{ order.tradeNO }}</td>
                        <td>{{ order.CategoryName }}</td>
                        <td>{{ order.StartDate }}</td>
                        <td>{{ order.EndDate }}</td>
                        <td>{{ order.Discount }}%</td>
                        <td>{{ order.Price }}</td>
                        <td>
                           <NButton type="error" @click="storeOrdersData.CancelDate">取消</NButton>
                        </td>
                     </tr>
                  </tbody>
               </NTable>
               <hr>
            </section>
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
   text-align: center;
}

.my-table-header th {
   background-color: lightgray;
   text-align: left;
   border-color: gray;
}

.my-table-tbody tr td {
   text-align: left;
   border-color: gray;
}
</style>