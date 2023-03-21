<script setup>
//Naive
import { NCard,NButton} from "naive-ui";

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
               <div>
                  <h5>➤ 訂單編號</h5>
               <p>{{storeOrdersData.OrderID}}</p>
               </div>
               <hr class="style-two">
               <div>
                  <h5>➤ 日期</h5>
               </div>
            <!-- <NDatePicker v-model:value="range" type="datetimerange" clearable />
               <pre>{{ JSON.stringify(range) }}</pre> -->
               <span>2023年03月15日 週三</span>
               <br>
               <span>10:00 → 18:00</span>
            </section>
            <hr class="style-two">
            <div>
            <h5>➤ 優惠券</h5>
            <span>已使用 10%off</span>
         </div>
            <hr class="style-two">
            <div>
               <h5>➤ 付款方式</h5>
               <span>信用卡/ 一次付清</span>
               <!-- <NButton type="warning">
                     信用卡/ 簽帳卡
                  </NButton>
                  <br>
                  <NButton type="info">
                     巷口支付
                  </NButton> -->
            </div>
            <hr class="style-two">
            <div>
               <h5>➤ 發票</h5>
               <input type="radio" name="invoice" value="personal" required>個人
               <input type="radio" name="invoice" value="company" checked>公司
               <input type="radio" name="invoice" value="donation">捐贈
               <br>
               載具/統編：12345678
            </div>
            <hr class="style-two">
            <section>
            <!-- <h5>➤ 租用退款政策</h5>
            <p style="color: darkred; font-weight: 400;">
                  預訂開始時間 48 小時前可全額退款，<br>
                  預訂開始時間 48 小時內即無法更改或取消訂單。
               </p> -->
               <NButton type="error" @click="storeOrdersData.CancelDate">
                  -----------------------------------------取消訂單-------------------------------------------
               </NButton>
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
</style>