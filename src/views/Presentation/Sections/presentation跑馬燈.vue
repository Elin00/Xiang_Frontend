<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import photo1 from "../../../assets/img/1-1.jpg";
import photo2 from "../../../assets/img/5-1.jpg";
import photo3 from "../../../assets/img/1-2.jpg";
import photo4 from "../../../assets/img/5-2.jpg";
import photo5 from "../../../assets/img/3-1.jpg";
import photo6 from "../../../assets/img/2-2.jpg";
import photo7 from "../../../assets/img/3-2.jpg";

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];
const id =[1, 2, 3, 4, 5, 6, 7];
const imageUrls = ref([...photos.map((photo,id) => ({ src: photo, link: `/views/rentroomview/${id}` }))]);
const scrollPosition = ref(0);
const scrollStep = 4;
const itemWidth = ref(0);
const containerWidth = ref(0);
const promoteList = ref(null);
let animationFrameId;
let startTimestamp;

onMounted(() => {
  startAutoScroll();
  getItemAndContainerWidth();
});

onUnmounted(() => {
  stopAutoScroll();
});

function step(timestamp) {
  if (!startTimestamp) {
    startTimestamp = timestamp;
  }

  const progress = timestamp - startTimestamp;

  if (progress >= 20) {
    scrollRight();
    startTimestamp = timestamp;
  }

  animationFrameId = requestAnimationFrame(step);
}

function startAutoScroll() {
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(step);
  }
}

function stopAutoScroll() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function scrollRight() {
  const maxScrollPosition = itemWidth.value * (photos.length - 1);

  scrollPosition.value += scrollStep;
  if (scrollPosition.value > maxScrollPosition) {
    scrollPosition.value = 0;
  }

  if (promoteList.value) {
    promoteList.value.scrollTo(scrollPosition.value, 0);
  }
}


function getItemAndContainerWidth() {
  const item = promoteList.value.querySelector("img");
  itemWidth.value = item.offsetWidth;
  containerWidth.value = promoteList.value.offsetWidth;
}
</script>
<template>
  <div class="promote-container">
    <div class="row">
      <div class="promote-main d-flex justify-content-center">
        <img src="../../../assets/img/下載.jpg" class="promote-main__img" alt="" />
        <div style="margin-left: 120px">
          <h1 class="content-title">
            鄭仲智皮包 共享中....
            <br />
            歡迎各位！
          </h1>
          <a href="https://thehapp.com/space/result?lat=25.008323165610395&lng=121.45451073244777" class="content-link">
            一起共襄盛舉
          </a>
        </div>
      </div>
    </div>
    <div class="promote-list item-4x" ref="promoteList">
      <div v-for="(imageUrl, index) in imageUrls" :key="index">
        <a :href="imageUrl.link">
          <img class="space-item" :src="imageUrl.src" @mouseover="stopAutoScroll" @mouseout="startAutoScroll" />
        </a>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-344px);
  }
}

.promote-list.item-4x {
  flex-wrap: nowrap;
  max-width: unset;
  overflow-x: hidden;
  padding: 20px 0;
}

.promote-list.item-4x .space-item {
  flex: 0 0 auto;
  width: 344px;
  margin-right: 24px;
}

.promote-list {
  display: flex;
  width: 100%;
  max-width: 1225px;
  margin: 42px auto -20px;
  padding: 20px;
}

.space-item {
  position: relative;
  width: 566px;
  height: 214px;
  background: #e6e6e6;
  border-radius: 8px;
  background-position: 75% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  transition: transform 0.5s;
}

.space-item:hover {
  transform: scale(1.05);
}

.content-link {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 21px;
  line-height: 1.4;
  letter-spacing: 0.5px;
  color: #3f916a;
  margin-top: 24px;
}

.content-title {
  font-weight: 500;
  font-size: 34px;
  line-height: 1.4;
  display: flex;
  letter-spacing: 0.5px;
  color: #4a4a4a;
}

.promote-main__img {
  width: 566px;
  height: 315px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  background-position: 75% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.promote-container {
  position: relative;
  padding: 75px 0;
  margin-bottom: 100px;
  background-color: #fff7f2;
  overflow: hidden;
}
</style>
