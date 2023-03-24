<script setup>
import { onMounted, onUnmounted } from "vue";

//example components

import Case from "./Sections/Case.vue";
import Process from "./Sections/Process.vue";
import Strength from "./Sections/Strength.vue";

//dep
import Typed from "typed.js";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";


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
  <Strength />
  <Case />
  <Process />
</template>

