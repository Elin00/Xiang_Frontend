
<script setup>
// image
import vueMkHeader from "@/assets/img/office-dark.jpg";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
</script>


<template>
  <h1>我們的優勢</h1>

  <div class="strength-box">
    <div class="strength-img"></div>
    <div class="Sbox1">box1</div>
    <div class="Sbox2">box2</div>
    <div class="Sbox3">box3</div>
    <div class="Sbox4">box4</div>
  </div>
</template>

<style>
.strength-box {
  display: grid;
  width: 900px;
  left: 50%;
  grid-template-columns: 400px 500px;
  grid-auto-rows: 160px 160px 160px 160px;
  column-gap: 30px;
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
}
.Sbox2 {
  grid-area: box2;
  background-color: aqua;
}
.Sbox3 {
  grid-area: box3;
  background-color: wheat;
}
.Sbox4 {
  grid-area: box4;
  background-color: darkcyan;
}
</style>