<script setup>
import { reactive, ref, onMounted } from "vue";
import { useMemberDataStore } from "../../../../stores/memberData.js";
import CreditCard from '../../Components/CreditCard.vue'
//下面二擇一
// import "../../../../assets/js/core/bootstrap.bundle.min.js";
import "../../../../assets/js/core/bootstrap.min.js";

const memberDataStore = useMemberDataStore();
const years = new Date().getFullYear();
const cardNum = reactive(['', '', '', ''])
const cardDate = reactive({ year: years, month: 1 })
const cardCodeNum = ref(0);
let testModal = null;

//正則驗證
const cardNumRule = /[0-9]{4}/;
const cardCodeRule = /[0-9]{3}/;

const saveCard = () => {
   if (memberDataStore.creditCard.length >= 3) {
      alert('超過三組卡號，請先刪除再新增');
   } else {
      if (cardNumRule.test(cardNum[0]) && cardNumRule.test(cardNum[1]) && cardNumRule.test(cardNum[2]) && cardNumRule.test(cardNum[3]) && cardCodeRule.test(cardCodeNum.value)) {
         memberDataStore.addCreditCard(cardNum.toString());
         testModalClose();
      } else {
         alert('輸入內容不正確，請輸入16位數字');
      }
   }
   cardNum[0] = '';
   cardNum[1] = '';
   cardNum[2] = '';
   cardNum[3] = '';

}
const testModalOpen = () => {
   testModal.show();
   console.log(testModal.show);
}
const testModalClose = () => {
   testModal.hide();
   console.log(testModal.hide);
}

onMounted(() => {
   testModal = new bootstrap.Modal(document.getElementById('exampleModal'));
})

</script>
<template>
   <div class="container">
      <div class="row">
         <div class="col">
            <h4>綁定信用卡</h4>
            <p>綁定信用卡加速付款程序，讓預訂更順暢！</p>
         </div>
      </div>

      <CreditCard v-if="memberDataStore.creditCard.length < 1" :have="false" />

      <CreditCard v-for="cardItem in memberDataStore.creditCard.length" :have="memberDataStore.creditCard.length >= 1"
         :cardNumInCard="memberDataStore.creditCard[cardItem - 1]" />

      <div class="row mb-5">
         <div class="col d-flex">
            <!-- Button trigger modal -->
            <button class="btn btn-success" @click="testModalOpen">新增信用卡</button>
         </div>
      </div>
   </div>

   <!-- Modal -->
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title fs-5" id="exampleModalLabel">
                  <h3>新增信用卡</h3>
               </h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <h5>
                  好刷一直刷
               </h5>
               <p>信用卡號</p>
               <div class="d-flex mb-3">
                  <input type="text" class="form-control btn-light creditCardText" placeholder="0000" maxlength="4"
                     v-model="cardNum[0]">
                  <h5 class="creditDash form-control">-</h5>
                  <input type="text" class="form-control btn-light creditCardText" placeholder="0000" maxlength="4"
                     v-model="cardNum[1]">
                  <h5 class="creditDash form-control">-</h5>
                  <input type="text" class="form-control btn-light creditCardText" placeholder="0000" maxlength="4"
                     v-model="cardNum[2]">
                  <h5 class="creditDash form-control">-</h5>
                  <input type="text" class="form-control btn-light creditCardText" placeholder="0000" maxlength="4"
                     v-model="cardNum[3]">
               </div>
               <p>信用卡到期日</p>
               <div class="d-flex">
                  <select v-model="cardDate.month" class="form-select w-10 text-center">
                     <option v-for="month in 12">{{ month }}</option>
                  </select>
                  <h5 class="creditDash form-control">/</h5>
                  <select v-model="cardDate.year" class="form-select w-15 text-center">
                     <option v-for="num in 25">{{ years + num - 1 }}</option>
                  </select>
               </div>
               <p>驗證碼</p>
               <input type="text" class="form-control btn-light w-15 creditCardText" placeholder="000" maxlength="3"
                  v-model="cardCodeNum">
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" @click="testModalClose">關閉</button>
               <button type="button" id="aa" class="btn btn-primary" @click="saveCard">儲存更新</button>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.emptyCard {
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 30px;
   background-color: #DCDCDC;
   width: 300px;
   height: 200px;
}

.emptyCard>h6 {
   color: white;
}

.haveCard {
   position: relative;
   background: linear-gradient(145deg, #6495ED, #E0FFFF);
   border-radius: 30px;
   width: 300px;
   height: 200px;
}

.haveCard>h6 {
   position: absolute;
   right: 20px;
   bottom: 15px;
   color: #4682B4;
}

.creditCardText {
   width: 60px;
   text-align: center;
   border: 1px solid gray;
}

.creditDash {
   margin: 0 10px;
   width: auto;
}

input::placeholder {
   text-align: center;
}
</style>