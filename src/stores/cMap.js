import { defineStore } from 'pinia';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref } from "vue";
import { useProductStore } from "../stores/ProductsAxios.js"

export const useMapStore = defineStore('map', () => {
    const mapContainer = ref(null);
    const markersLayer = L.layerGroup();  // 定義一個 markersLayer 變數

    // 初始化 Leaflet 地圖
    const map = L.map(mapContainer.value, {
        center: [22.8, 120.5],
        zoom: 10,
    });

    // 添加瓷磚圖層到地圖
    const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //加入marker
    const addMarkers = () => {
        const { markers } = useProductStore();
        markers.forEach((marker) => {
            const { lat, lng, name, description } = marker;
            const newMarker = L.marker([lat, lng]).addTo(markersLayer);
            newMarker.bindPopup(`<b>${name}</b><br>${description}`)
        });
        console.log(markers)
    };


    // 將 markersLayer 添加到地圖
    markersLayer.addTo(map);

    return {
        mapContainer, map, tileLayer, markersLayer, addMarkers
    }
})
