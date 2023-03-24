<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
//image
import AboutUs1 from "@/assets/img/AboutUs4.jpg";
//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";

// image
import team1 from "@/assets/img/team-8.jpg";
import team2 from "@/assets/img/team2.jpg";
import team3 from "@/assets/img/team3.jpg";

//dep
</script>

<template>
  <div class="section1 topic1" :style="`background-image: url(${AboutUs1})`">
    關於我們
  </div>
  <div class="section2 topic2">
    <div class="p-box">
      <p>
        我們是一家共享空間平台的新創公司。一開始，我們只有一個小小的想法：讓人們更方便地分享和利用未被充分利用的空間。當時，我們還在學校學習，沒有太多的經驗和資金，但我們相信這個點子有潛力。於是，我們開始了漫長的創業之路。
      </p>
      <p>
        我們做了大量的市場調查和產品設計，希望找到最適合的方式來實現我們的想法。在這個過程中，我們遇到了很多困難和挑戰。我們花了很長時間尋找合適的技術人才，我們也遇到了很多投資者的拒絕。
        然而，我們並沒有放棄。我們一直堅持著自己的想法，並繼續改進我們的產品。最終，我們成功地開發出了一個簡單易用的共享空間平台，為人們提供了更方便和經濟實惠的解決方案。
      </p>
      <p>
        現在，我們的平台已經發展成為一個受歡迎的社區，有著成千上萬的用戶和合作夥伴。我們一直堅持著初衷，努力推動共享經濟的發展，為社會帶來了實實在在的價值。我們深知這只是一個開始，未來還有更多的挑戰和機會等待著我們，但我們會繼續不斷創新和進步，為更多的人帶來實用和有意義的產品。
        除了我們的開發團隊之外，「想享」平台還有一支優秀的管理團隊，他們致力於確保平台的穩定運行和用戶體驗，為使用者提供更好的服務和支持。「想享」平台不僅提供一個舒適和充滿創意氛圍的工作環境，還有各種社交活動、交流會議等活動，讓使用者能夠更好地認識其他創意人士和擴展人脈。
      </p>
      <p>
        最後，我們非常期待您的加入和支持。如果您是一個創意人士、自由工作者或新創公司，「想享」平台是您不可錯過的共享空間。我們相信，您在這裡將會找到一個讓您實現夢想的工作環境。感謝您的閱讀，期待與您相見！
        我們的開發團隊非常自豪地為「想享」的設計和開發貢獻了自己的力量。
      </p>
    </div>
    <div class="team">
      <h2 style="text-align: center">About Team</h2>
      <div>
        <a href="javascript:;">
          <MaterialAvatar :image="team1" alt="Image placeholder" size="xxl" />
        </a>
        <a>執行長-鄭智智</a>
      </div>
      <div>
        <a href="javascript:;">
          <MaterialAvatar :image="team2" alt="Image placeholder" size="xxl" />
        </a>
        <a>KenCCC</a>
      </div>
      <div>
        <a href="javascript:;">
          <MaterialAvatar :image="team3" alt="Image placeholder" size="xxl" />
        </a>
        <a>KenCCCCCCCC</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-header min-vh-75 {
  background-attachment: fixed;
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.section1 {
  width: 100%;
  height: 100vh;
  color: #012e01;
  font-size: 80px;
  line-height: 80vh;
  text-align: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  font-weight: bold;
  opacity: 0.6;
}

.section2 {
  width: 100%;
  height: 160vh;
  /* background-color: #666; */
  color: #111;
  font-size: 18px;
  line-height: 20vh;
  /* text-align: center; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

.p-box {
  width: 1000px;
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: aqua; */
}

.p-box p {
  font-size: 22px;
  margin-bottom: 2rem;
  text-indent: 44px;
}

.team {
  margin-top: 5%;
  border-top: 1px solid #888;
}</style>
