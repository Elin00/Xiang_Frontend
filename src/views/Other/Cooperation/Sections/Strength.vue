
<script setup>
// image

import Icon1 from "@/assets/img/strength-Icon1.png";
import Icon2 from "@/assets/img/strength-Icon2.png";
import Icon3 from "@/assets/img/Icon3.png";
import Icon4 from "@/assets/img/strength-Icon4.png";
import StrengthImg from "@/assets/img/strength-img.jpg";
import StrengthImg2 from "@/assets/img/strength-img2.jpg";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
</script>


<template>
  <h1 style="
            text-align: center;
            color: #909fa6;
            text-shadow: 4px 5px 6px #ccc;
            margin-top: 200px;
          ">
    善用閒置空間，輕鬆極大化收益
  </h1>

  <p style="text-align: center; font-size: 26px;margin-bottom: 200px;">
    讓你的房屋物件每月提高 50% 租金收益的方法
  </p>

  <div class="container ">
    <div class="row justify-content-center">
      <div class="col-12">
        <h3 style="text-align: center; margin-bottom: 25px">我們的優勢</h3>

      </div>
      <div class="col-12 col-lg-6 mb-5">
        <div class="strength-img">
          <div class="card-filp">
            <div class="front">
              <img :src="StrengthImg" style="border-radius: 20px" />
            </div>
            <div class="back" :style="`background-image: url(${StrengthImg2})`"
              style="height: 590px; border-radius: 20px">
              <div style="margin-left: 35%; transform: translateY(520px)">
                <MaterialButton variant="outline" color="dark" class="w-auto me-2"><a href="#JoinUs">立即加入我們</a>
                </MaterialButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 col-lg-6">
        <div class="row Mycard  p-2 mb-4">
          <div class="col-3 col-lg-2 pt-3 ">
            <a href="javascript:;">
              <MaterialAvatar :image="Icon1" alt="Image placeholder" size="lg" />
            </a>
          </div>
          <div class="col-9 col-lg-10 ">
            <h5>輕鬆得利潤</h5>
            <span>由我們負責現場營運與空間管理，您可以輕鬆查看每月營收狀況，並收取分潤。</span>
          </div>
        </div>
        <div class="row Mycard  p-2 mb-4">
          <div class="col-3 col-lg-2 pt-3 ">
            <a href="javascript:;">
              <MaterialAvatar :image="Icon2" alt="Image placeholder" size="lg" />
            </a>
          </div>
          <div class="col-9 col-lg-10 ">
            <h5>高租金回報</h5>
            <span>每月單坪收益有機會高達至 3,000
              元，遠高於一般出租房屋的租金收益。</span>
          </div>
        </div>
        <div class="row Mycard  p-2 mb-4">
          <div class="col-3 col-lg-2 pt-3 ">
            <a href="javascript:;">
              <MaterialAvatar :image="Icon3" alt="Image placeholder" size="lg" />
            </a>
          </div>
          <div class="col-9 col-lg-10 ">
            <h5>低維護成本</h5>
            <span>使用密碼進入空間，結束後派人前往維護。在優化清潔模式、與增加安全管理的同時，我們透過系統化的作業與無人化的管理，大幅降低了
              90% 的營運成本與 50% 的溝通成本。</span>
          </div>
        </div>
        <div class="row Mycard  p-2 mb-4">
          <div class="col-3 col-lg-2 pt-3 ">
            <a href="javascript:;">
              <MaterialAvatar :image="Icon4" alt="Image placeholder" size="lg" />
            </a>
          </div>
          <div class="col-9 col-lg-10 ">
            <h5>帶動資產價值</h5>
            <span>好的「租金收益」、「專人維護管理」以及絡繹不絕的人流「活絡周邊商圈」，此三元素共同提升資產價值。</span>
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<style>
.Mycard {
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px;
}


/* 圖片翻轉 */
.card-filp {
  width: 400px;
  height: 600px;
  position: relative;
  transform-style: preserve-3d;
  transition: 1.5s;
}

.front,
.back {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
}

.front {
  width: 400px;
  height: 600px;
}

.back {
  width: 400px;
  height: 600px;
}

.back {
  transform: rotateY(180deg);
}

.card-filp:hover {
  transform: rotateY(180deg);
}
</style>