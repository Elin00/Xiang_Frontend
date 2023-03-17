<script setup>
//Naive
import { NCard, NButton, NDatePicker, NTable } from "naive-ui";

import { defineComponent, ref } from "vue";

defineComponent({
   range: ref([118313526e4, Date.now()])
});
</script>

<template>
   <div class="container">
      <div class="row">
         <div class="col-5">
            <NCard title="HEADSHOT OF CHENGBAO 2023MARCH ">
               <template #cover>
                  <img src="../../../../assets/img/202303chengbao.jpg">
               </template>
               NTD$50/piece
            </NCard>
            <h4>BUY 1 GET 1 FREE !!!!<br>call now 0963177377</h4>
         </div>
         <div class="col-7">
            <section>
               <NTable :bordered="true" :single-line="false" class="my-table">
                  <thead class="my-table-header">
                     <tr>
                        <th>訂單編號</th>
                        <th>預約日期</th>
                        <th>優惠券</th>
                        <th>付款方式</th>
                        <th>發票類型</th>
                     </tr>
                  </thead>
                  <tbody class="my-table-tbody">
                     <tr>
                        <td>OrderID666666</td>
                        <td>2023年03月15日 週三<br>
                           10:00 → 18:00</td>
                        <td>已使用 10%off</td>
                        <td>信用卡/ 一次付清</td>
                        <td>公司<br>
                           載具/統編：12345678</td>
                     </tr>
                     <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                     </tr>
                     <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
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
   /* text-align: center; */
}

.my-table-header th {
   background-color: lightgray;
   border-color: gray;
   /* text-align: left; */
}

.my-table-tbody tr td {
   border-color: gray;
   /* text-align: left; */
}
</style>