<script setup>
import { } from "vue";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";

// image
import team4 from "@/assets/img/team-4.jpg";
import KenCC from "../../../assets/img/202303chengbao.jpg"
import Elin from "../../../assets/img/Elin.jpg"
import KenCCC from "../../../assets/img/KenCCC.png"
import Enya from "../../../assets/img/Enya.jpg"

//example components

import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import NavbarDefault from "../../../examples/navbars/NavbarDefault.vue";
//image
import bg0 from "../../../assets/img/pexels-office.jpg";

//dep

//sections
// import Information from "./Sections/AboutInformation.vue";
// import AboutTeam from "./Sections/AboutTeam.vue";
// import Featuring from "./Sections/AboutFeaturing.vue";
// import Newsletter from "./Sections/AboutNewsletter.vue";

const body = document.getElementsByTagName("body")[0];
//hooks

</script>
<template>
    <header class="">
        <section class="room">
            <div class="room_bg bg1">
                <h1 class="title1">關於你的歌</h1>
            </div>
            <div class="room_bg bg2">
                <h1 class="title2">
                    大家好，我們很高興向大家介紹一個共享空間平台網站叫做「想享」。<br>
                    「想享」是一個專為創意人士、自由工作者和新創公司等群體打造的共享空間平台，<br>
                    旨在提供一個舒適、便捷、具有創意氛圍的工作環境，讓使用者能夠更加高效地工作和交流合作。<br>
                    <br>
                    我們的開發團隊非常自豪地為「想享」的設計和開發貢獻了自己的力量。<br>
                    我們的團隊由 Ken CC、Ken CCC、Elin、Enya 和 Kevien組成，<br>
                    他們是一群對創新和科技有著極大熱情的年輕人。他們通過自己的不斷學習和實踐，<br>
                    為「想享」的開發提供了專業和高效的支持。<br>
                    <br>
                    除了我們的開發團隊之外，「想享」平台還有一支優秀的管理團隊，<br>
                    他們致力於確保平台的穩定運行和用戶體驗，為使用者提供更好的服務和支持。<br>
                    「想享」平台不僅提供一個舒適和充滿創意氛圍的工作環境，還有各種社交活動、交流會議等活動，<br>
                    讓使用者能夠更好地認識其他創意人士和擴展人脈。<br>
                    <br>
                    最後，我們非常期待您的加入和支持。如果您是一個創意人士、自由工作者或新創公司，<br>
                    「想享」平台是您不可錯過的共享空間。我們相信，您在這裡將會找到一個讓您實現夢想的工作環境。<br>
                    感謝您的閱讀，期待與您相見！<br>
                </h1>
            </div>
            <div class="room_bg bg3">
                <h1 class="title">唱著後來我們</h1>
                <div class="row">
                <div class="col">
                    <a href="javascript:;">
                            <MaterialAvatar :image="KenCC" alt="Image placeholder" size="xxl" />
                        </a>
                        <p class="name">KenCC</p>
                    </div>
                    <div class="col">
                        <a href="javascript:;">
                            <MaterialAvatar :image="Elin" alt="Image placeholder" size="xxl" />
                        </a>
                    <p class="name">Elin</p>
                </div>
                <div class="col">
                        <a href="javascript:;">
                            <MaterialAvatar :image="KenCCC" alt="Image placeholder" size="xxl" />
                        </a>
                        <p class="name">KenCCC</p>
                    </div>
                    <div class="col">
                        <a href="javascript:;">
                            <MaterialAvatar :image="Enya" alt="Image placeholder" size="xxl" />
                        </a>
                        <p class="name">Enya</p>
                    </div>
                    <div class="col">
                        <a href="javascript:;">
                            <MaterialAvatar :image="team4" alt="Image placeholder" size="xxl" />
                        </a>
                        <p class="name">Kevien</p>
                    </div>
                </div>
                <!-- <div class="img-wrap">
                            <img src="../../../assets/img/202303chengbao.jpg" alt="">
                        </div> -->
            </div>
            <div class="room_bg bg4">
                <h1 class="title">一遍遍唱著</h1>
            </div>
        </section>
    </header>
    <div class="">
        <!-- <Information />
                <AboutTeam />
                <Featuring />
                <Newsletter /> -->
    </div>
</template>
<style scoped>
.img {
    height: 800px;
    width: 100%;
}

.room_bg {
    width: 100%;
    height: 100vh;
    display: grid;
    place-content: center;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.title {
    color: #fff;
    font-size: 9rem;
    mix-blend-mode: difference;
}

.title1 {
    color: #fff;
    font-size: 9rem;
    mix-blend-mode: difference;
}

.title2 {
    color: #fff;
    font-size: 27px;
    mix-blend-mode: difference;
    max-width: 100%;
    font-family: DFKai-SB;
    /* display: flex; */
    align-items: center;
    /* justify-content: center; */
    /* justify-items: center; */
}

.bg1 {
    background-image: url(../../../assets/img/pexels01.jpg);
}

.bg2 {
    background-image: url(../../../assets/img/pexels02.jpg);
}

.bg3 {
    background-image: url(../../../assets/img/pexels05.jpg);
}

.bg4 {
    background-image: url(../../../assets/img/pexels04.jpg);
}

/* 
.img-wrap img {
  width: 450px;
  height: 220px;
  border-radius: 15px;
  clip-path: circle(50% at 50% 50%);
} */

.row .col {
    float: left;
    width: 12.5%;
}

.name {
    font-weight: 500;
    font-family: 'Courier New', Courier, monospace;
    font-size: 25px;
    text-decoration: underline;
    color: black;
    margin-left: 25px;
}
</style>
