<script setup>
import { ref, reactive } from "vue";
import { useCouponDataStore } from "../../../../stores/CouponData.js";

const CouponData = useCouponDataStore();



const points = ref(100);
//Modal，按下按鈕後將資料傳送到這裡在傳到Modal
const modalinfo = reactive({ title: "目前積分可換優惠卷", body: "bodyy" });
const cimsInputClick = () => {
  window.location.href = "http://localhost:3000/other/CouponView/UseCouponView";
};
</script>

<template>
  <div class="container">
    <div class="row mb-5">
      <h4>目前累計的積分</h4>
      <p>來兌換吧</p>
    </div>
    <div class="row">
      <div class="col-6 border-bottom mb-5">
        <h5>積分總數</h5>
        <p>{{ points }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6 border-bottom mb-5 d-flex justify-content-between">
        <h5>可兌換查詢</h5>
        <!-- Button trigger modal -->
        <h6 data-bs-toggle="modal" data-bs-target="#exampleModal">查詢</h6>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ modalinfo.title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- <div class="modal-body">
               {{ modalinfo.body }}
            </div> -->
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">序列</th>
              <th scope="col">優惠碼</th>
              <th scope="col">積分</th>
              <th scope="col">打折</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in CouponData.point" :key="index">
              <th scope="row">{{ item.couponId }}</th>
              <td>{{ item.code }}</td>
              <td>{{ item.howPoint }}</td>
              <td>{{ item.discount }}折</td>
            </tr>
          </tbody>
        </table>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="cimsInputClick">
            來去兌換
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h5 + p {
  font-family: sans-serif;
  font-weight: 900;
}

h6 {
  cursor: pointer;
}
</style>
