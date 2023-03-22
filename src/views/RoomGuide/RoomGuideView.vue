<script setup>
// Vue Material Kit 2 components
import axios from "axios";
import RotatingCardForRoom from "@/examples/component/RotatingCardForRoom.vue";
import RotatingCardFrontForRoom from "@/examples/component/RotatingCardFrontForRoom.vue";
import RotatingCardBackForRoom from "@/examples/component/RotatingCardBackForRoom.vue";

//leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref, reactive } from "vue";

//import pinia
import { useProductStore } from "../../stores/ProductsAxios.js"



const Productspinia = useProductStore();
//data
const currentFilter = ref('location');
const mapContainer = ref(null);


//function
const selectFilter = (filterName) => {
    currentFilter.value = filterName;
    store.selectFilter(filterName);
}


// const selectedCard = computed(() => {
//   if (!selectedMarker.value) return null;

//   const room = productRoom.value.find(
//     (room) =>
//       room.sName === selectedMarker.value.name && room.rStatus === "available"
//   );

//   if (!room) return null;

//   return {
//     icon: "touch_app",
//     title: room.rDescription,
//     image: `./src/assets/img/${room.rImage}`,
//     description: room.rDescription,
//     action: [
//       {
//         route: "/views/rentroomview",
//         label: "現在就訂房",
//       },
//     ],
//   };
// });



const markersLayer = L.layerGroup();
//hook
onMounted(() => {

    const map = L.map(mapContainer.value, {
        center: [22.8, 120.5],
        zoom: 10,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markersLayer.addTo(map);

    const selectedMarker = reactive(null);
    Productspinia.axiosInit().then(() => {
        //加入卡片
        const { cardinfo } = useProductStore();
        //加入marker
        const { markers } = useProductStore();
        // console.log(markers)
        markers.forEach((marker) => {
            const { lat, lng, name, description } = marker;
            const newMarker = L.marker([lat, lng]).addTo(markersLayer);
            newMarker.bindPopup(`<b>${name}</b><br>${description}`)
            newMarker.on("click", () => {
                selectedMarker.value = marker;
            });
        });
    })

});

</script>
<template>
    <!-- 過濾器 -->
    <header>
        <div class="filter-bar filter-wrapper mt-3 ml-3">
            <div class="filter-group location" @click="selectFilter('location')">
                <span :class="{ focus: currentFilter === 'location' }">城市</span>
            </div>
            <div class="divider"></div>
            <div class="filter-group hourlyTime" @click="selectFilter('hourlyTime')">
                <span :class="{ focus: currentFilter === 'hourlyTime' }">時間</span>
            </div>
        </div>
    </header>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-6 space-wrapper">
                <div class="space-wrapper__list">
                    <div class="grid">
                        <RotatingCardForRoom v-for="(item, index) in Productspinia.cardinfo" :key="index">
                            <RotatingCardFrontForRoom :image="item.image" :icon="item.icon" :title="item.title"
                                :description="item.description" />
                            <RotatingCardBackForRoom :image="item.image" :title="item.title" :description="item.description"
                                :action="item.action" />
                        </RotatingCardForRoom>
                    </div>
                </div>
            </div>
            <div class="col-6 space-wrapper">
                <div class="mapContainer" ref="mapContainer"></div>
            </div>
        </div>
    </div>
</template>
<style>
.ml-3 {
    margin-left: 30px;
}

.fix-pos {
    position: fixed;
}

.mapContainer {
    width: 100%;
    height: 100%;
}

.space-wrapper__list {
    padding: 20px 20px;
    margin: 0;
    width: 100%;
    height: 700px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.grid {
    width: 100%;
    height: 400px;
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(2, 1fr);
}

/* 過濾器 */
.filter-bar {
    width: fit-content;
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid #c9c9c9;
    border-radius: 8px;
    position: relative;
    z-index: 99;
}

.filter-wrapper {
    margin: 18px 24px 0;
}

.filter-bar.focus {
    background: #f7f7f7;
}

.filter-bar .filter-group.location {
    min-width: 200px;
}

.filter-bar .filter-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    padding: 15px 15px 20px 25px;
    cursor: pointer;
    border-radius: 8px;
    transition: all .3s ease;
}

.filter-bar .divider {
    display: block;
    height: 27px;
    border-left: 1px solid #e7e7e7;
    margin: 0 14px;
}

.filter-bar .filter-group.hourlyTime {
    min-width: 222px;
}

.filter-bar .filter-group.guest[data-v-391ff127] {
    min-width: 252px;
}


.filter-bar .filter-group.focus {
    background: #fff;
    box-shadow: 0 0 4px #00000014, 0 0 14px #0000001f;
    transform: scale(1.02);
}
</style>