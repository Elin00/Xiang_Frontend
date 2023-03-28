<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import Header from "../../examples/Header.vue";
import homefooter from "../../examples/footers/homefooter.vue";

// sections
import presentationcarousel from "./Sections/presentationcarousel.vue";
import presentation跑馬燈 from "./Sections/presentation跑馬燈.vue";
import presentation使用者操作 from "./Sections/presentation使用者操作.vue";
import presentationHeader打字效果 from "./Sections/presentationHeader打字效果.vue";

//images
import vueMkHeader from "@/assets/img/office-dark.jpg";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <!-- 這邊要改中間內容 -->
  <Header>
    <div class="page-header min-vh-75" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 text-center mx-auto position-relative">
            <presentationHeader打字效果 />
            <div class="container">
              <div class="row">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="container">
    <div class="row">
      <presentationcarousel />
    </div>
  </div>
  <presentation跑馬燈 />
  <presentation使用者操作 />
  <div class="container-fluid">
    <div class="row">
      <homefooter />
    </div>
  </div>
  <!-- <DefaultFooter /> -->
</template>
