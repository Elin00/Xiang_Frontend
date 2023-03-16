<script setup>
//Naive
import { NCard, NButton, NDatePicker} from "naive-ui";

import { defineComponent, ref } from "vue";

defineComponent({
      range: ref([118313526e4, Date.now()])
});
</script>

<template>
   <div class="container">
      <div class="row">
         <div class="col-6">
            <NCard title="HEADSHOT OF CHENGBAO 2023MARCH ">
               <template #cover>
                  <img src="../../../../assets/img/202303chengbao.jpg">
               </template>
               NTD$50/piece
            </NCard>
            <h4>BUY 1 GET 1 FREE !!!!<br>call now 0963177377</h4>
         </div>
         <div class="col-6">
            <section>
               <div>
                  <h5>➤ 訂單編號</h5>
                  <p>OrderID666666</p>
               </div>
               <hr class="style-two">
               <div>
                  <h5>➤ 日期</h5>
                  <!-- <NButton type="primary" dashed>
                     編輯
                  </NButton> -->
                  <!-- <button style="primary" dashed>編輯</button> -->
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
               <!-- <NButton type="info" dashed>
                  選擇使用
               </NButton> -->
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
               <input type="radio" checked>公司
               <br>
               <span>載具/統編：12345678</span>
            </div>
            <hr class="style-two">
            <section>
               <p style="color:blue; font-weight: 400;">
                  感謝光臨，期待再次與您見面 <br>
                  若有任何指教請不吝與我們聯繫喲~
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
</style>