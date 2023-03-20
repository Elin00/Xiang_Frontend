<script setup>
import { onMounted, onUnmounted } from "vue";

//dep
import Typed from "typed.js";


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
    <h4 class="text-black pt-3 mt-n5 me-2" :style="{ display: 'inline-block ' }">
        在這個充滿緊張與焦慮的世界中，我們致力於為您創造一個放鬆、交流、學習與成長的共享空間。<br>
        <span class="text-black" id="typed"></span>

        <div id="typed-strings">
            <h1>舒適安心的聚會空間，享受與朋友們再次相聚的快樂</h1>
            <h1>在零打擾的專屬空間，找回屬於自己的專注節奏</h1>

        </div>
    </h4>
</template>