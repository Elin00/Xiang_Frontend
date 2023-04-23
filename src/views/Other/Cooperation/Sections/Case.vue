<script setup>
//Naive
import { NCard } from "naive-ui";

// image
import team4 from "@/assets/img/team-2.jpg";
import team1 from "@/assets/img/team-1.jpg";
import vueMkHeader from "@/assets/img/office-dark.jpg";
import Cooperation from "@/assets/img/Cooperation.jpg";
import Cooperation2 from "@/assets/img/Cooperation2.jpg";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
</script>


<template>
  <div class="container" style="margin-top: 200px;">
    <div class="row justify-content-center">
      <div class="col-12">
        <h4 style="text-align: center">合作案例</h4>
        <p style="font-size: 30px;text-align: center">看看其他合作夥伴的空間有了新方向！</p>
      </div>
      <div class="col-10 col-lg-5 mb-5">
        <n-card title="带封面的卡片" hoverable>
          <template #header>
            <div class="title-box">
              <div class="title-img">
                <a href="javascript:;">
                  <MaterialAvatar :image="team1" alt="Image placeholder" size="lg" />
                </a>
              </div>
              <div class="title-p">
                <h5>業主A</h5>
                <p style="font-weight: bold">大幅補貼了辦公室的租金！</p>
              </div>
              <p>“把公司會議室於非上班時段出租，大幅貼補了辦公室的租金！”</p>
            </div>
            <div class="img-wrap">
              <img :src="Cooperation" />
            </div>
            <p class="p-title">
              總坪數：10.3 坪<br />每坪分潤：3,300 元/月(僅平日晚上與假日開放)
            </p>
            <p>
              活用非上班時間的會議室，平日做為公司夥伴的會議空間，假日則做為共享空間出租。
            </p>
          </template>
        </n-card>
      </div>
      <div class="col-10 col-lg-5 mb-5">
        <n-card title="带封面的卡片" hoverable>
          <template #header>
            <div class="title-box">
              <div class="title-img">
                <a href="javascript:;">
                  <MaterialAvatar :image="team4" alt="Image placeholder" size="lg" />
                </a>
              </div>
              <div class="title-p" style="vertical-align: middle">
                <h5>業主B</h5>
                <p style="font-weight: bold">讓我放心輕鬆地收租金！</p>
              </div>
              <p>“有專人替自己管理房屋讓我省下了不少處理租戶問題的心力”</p>
            </div>
            <div class="img-wrap">
              <img :src="Cooperation2" />
            </div>
            <p class="p-title" id="JoinUs">
              總坪數：21.69坪<br />每坪分潤：3,000 元/月
            </p>
            <p>由於二三樓長期閒置，故與想享討論後合作做為共享空間。</p>
          </template>
        </n-card>
      </div>

    </div>
  </div>
</template>

<style>
.n-card {
  max-width: 500px;
}

.img-wrap img {
  width: 100%;
  height: 220px;
  border-radius: 15px;
}

.title-img {
  float: left;
  margin: 0 20px 0 0;
  clear: both;
  width: 48px;
  height: 48px;
}

.p-title {
  font-weight: bold;
}
</style>