<script setup>
//Naive
import { NCard, NButton, NTable } from "naive-ui";

// import { defineComponent, ref } from "vue";
import { useOrdersDataStore } from "../../../../stores/ordersData.js";

const storeOrdersData = useOrdersDataStore()

// defineComponent({
//    range: ref([118313526e4, Date.now()])
// });
</script>

<template>
   <div class="container">
      <div class="row">
         <!-- <div class="col-5">
               <NCard title="HEADSHOT OF CHENGBAO 2023MARCH ">
                  <template #cover>
                     <img src="../../../../assets/img/202303chengbao.jpg">
                  </template>
                  NTD$50/piece
               </NCard>
               <h4>BUY 1 GET 1 FREE !!!!<br>call now 0963177377</h4>
            </div> -->
         <div class="col-10">
            <section>
               <NTable :bordered="true" :single-line="false" class="my-table">
                  <thead class="my-table-header">
                     <tr>
                        <th>訂單編號</th>
                        <th>房型種類</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>優惠券</th>
                        <th>總價</th>
                        <th>取消訂單</th>
                     </tr>
                  </thead>
                  <tbody class="my-table-tbody">
                     <tr>
                        <td>{{ storeOrdersData.OrderID }}</td>
                        <td>{{ storeOrdersData.CategoryName }}</td>
                        <td>{{ storeOrdersData.StartDate }}</td>
                        <td>{{ storeOrdersData.EndDate }}</td>
                        <td>{{ storeOrdersData.Discount }}</td>
                        <td>{{ storeOrdersData.Price }}</td>
                        <td>
                           <NButton type="error" @click="storeOrdersData.CancelDate">取消</NButton>
                        </td>
                     </tr>
                     <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>
                           <NButton type="error" @click="storeOrdersData.CancelDate">取消</NButton>
                        </td>
                     </tr>
                     <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                     <td>...</td>
                     <td>
                        <NButton type="error" @click="storeOrdersData.CancelDate">取消</NButton>
                     </td>
                     </tr>

                  </tbody>
            </NTable>
            <hr class="style-two">
               <p style="color:blue; font-weight: 400;">
                  AAA <br>
                  BBB
               </p>
               <!-- <h5>➤ 租用退款政策</h5>
                  <p style="color: darkred; font-weight: 400;">
                     預訂開始時間 48 小時前可全額退款，<br>
                     預訂開始時間 48 小時內即無法更改或取消訂單。
                  </p> -->
            </section>
            <hr class="style-two">
            <!-- <NButton type="success">
                                    -----------------------------------------------------付款-------------------------------------------------------
                                 </NButton> -->
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
   border-color: gray;
   text-align: left;
}
</style>