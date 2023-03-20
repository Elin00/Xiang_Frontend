<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import Header from "../../../examples/Header.vue";
import homefooter from "../../../examples/footers/homefooter.vue";
import Case from "./Sections/Case.vue";
import Process from "./Sections/Process.vue";
import Strength from "./Sections/Strength.vue";

//dep
import Typed from "typed.js";

//Naive
import { NCard } from "naive-ui";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";

// image
import team4 from "@/assets/img/team-2.jpg";
import vueMkHeader from "@/assets/img/office-dark.jpg";
import Cooperation from "@/assets/img/Cooperation.jpg";

const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 120,
      backSpeed: 120,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <!-- <Header>
    <div class="page-header min-vh-75" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h4 class="text-black pt-3 mt-n5 me-2" :style="{ display: 'inline-block ' }">
              在這個充滿緊張與焦慮的世界中，我們致力於為您創造一個放鬆、交流、學習與成長的共享空間。<br>
              <span class="text-black" id="typed"></span>

              <div id="typed-strings">
                <h1>舒適安心的聚會空間，享受與朋友們再次相聚的快樂</h1>
                <h1>在零打擾的專屬空間，找回屬於自己的專注節奏</h1>
              </div>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </Header> -->
  <Strength />
  <Case />
  <Process />
</template>

