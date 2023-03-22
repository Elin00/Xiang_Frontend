<script setup>
import { RouterLink, RouterView } from "vue-router";

import MemberHeader from "../Components/MemberHeader.vue";

import { useOrdersDataStore } from "../../../stores/ordersData.js";

import { ref } from "vue";

const store = useOrdersDataStore()

// import axioss from "axios";
function useAxiosCard() {
   const data = ref(null);
   const errorMessage = ref('');
   const axiosInit = async () => {
      //使用 then 寫法 
      //await axioss.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314").then(res => { 
      //data.value = res.data; 
      //}).catch(err => { 
      //errorMessage.value = "API發生錯誤"; 
      //}).finally(() => { }) 
      //也可以用給變數的做法 
      try {
         const res = await axios.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314");
         data.value = res.data;
      } catch (error) {
         errorMessage.value = "API發生錯誤";
      }
   }
}

</script>

<template>
   <MemberHeader labelString="我的預定" />
   <div class="container">
      <div class="row">
         <ul class="list-unstyled d-flex border-bottom">
            <li class="me-4">
               <RouterLink :to="{ name: 'member-orders-inprogress' }">
                  <h5>尚未結束</h5>
               </RouterLink>
            </li>
            <li class="me-4">
               <RouterLink :to="{ name: 'member-orders-finish' }">
                  <h5>已結束</h5>
               </RouterLink>
            </li>
            <li class="me-4">
               <RouterLink :to="{ name: 'member-orders-cancel' }">
                  <h5>已取消</h5>
               </RouterLink>
            </li>
         </ul>
      </div>
   </div>
   <RouterView />
</template>

<style scoped>
h5 {
   color: gray;
}
</style>