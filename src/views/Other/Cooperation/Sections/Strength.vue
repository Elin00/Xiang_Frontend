
<script setup>
// image
import vueMkHeader from "@/assets/img/office-dark.jpg";
import team4 from "@/assets/img/team-2.jpg";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
</script>


<template>
  <h1>我們的優勢</h1>

  <div class="strength-box">
    <div class="strength-img"></div>
    <div class="Sbox1">
      <div class="row">
        <div class="col-2">
          <a href="javascript:;">
            <MaterialAvatar :image="team4" alt="Image placeholder" size="lg" />
          </a>
        </div>
        <div class="col-10">
          <h5>輕鬆得利潤</h5>
          <span
            >由我們負責現場營運與空間管理，您可以輕鬆查看每月營收狀況，並收取分潤。</span
          >
        </div>
      </div>
    </div>
    <div class="Sbox2">
      <div class="row">
        <div class="col-2">
          <a href="javascript:;">
            <MaterialAvatar :image="team4" alt="Image placeholder" size="lg" />
          </a>
        </div>
        <div class="col-10">
          <h5>高租金回報</h5>
          <span
            >每月單坪收益有機會高達至 3,000
            元，遠高於一般出租房屋的租金收益。</span
          >
        </div>
      </div>
    </div>
    <div class="Sbox3">
      <div class="row">
        <div class="col-2">
          <a href="javascript:;">
            <MaterialAvatar :image="team4" alt="Image placeholder" size="lg" />
          </a>
        </div>
        <div class="col-10">
          <h5>低維護成本</h5>
          <span
            >使用密碼進入空間，結束後派人前往維護。在優化清潔模式、與增加安全管理的同時，我們透過系統化的作業與無人化的管理，大幅降低了
            90% 的營運成本與 50% 的溝通成本。</span
          >
        </div>
      </div>
    </div>
    <div class="Sbox4">
      <div class="row">
        <div class="col-2">
          <a href="javascript:;">
            <MaterialAvatar :image="team4" alt="Image placeholder" size="lg" />
          </a>
        </div>
        <div class="col-10">
          <h5>高租金回報</h5>
          <span
            >好的「租金收益」、「專人維護管理」以及絡繹不絕的人流「活絡周邊商圈」，此三元素共同提升資產價值。</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.strength-box {
  display: grid;
  width: 900px;
  left: 50%;
  grid-template-columns: 400px 500px;
  grid-auto-rows: 160px 160px 160px 160px;
  column-gap: 40px;
  grid-template-areas:
    "strength-img box1"
    "strength-img box2"
    "strength-img box3"
    "strength-img box4";
}
.strength-img {
  grid-area: strength-img;
  background-color: palevioletred;
}
.Sbox1 {
  grid-area: box1;
  background-color: antiquewhite;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.Sbox2 {
  grid-area: box2;
  background-color: aqua;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.Sbox3 {
  grid-area: box3;
  background-color: wheat;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.Sbox4 {
  grid-area: box4;
  background-color: oldlace;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.strength-box div {
  margin-bottom: 15px;
}
</style>