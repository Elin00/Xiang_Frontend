import { defineStore } from 'pinia'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref } from "vue";

export const useMapStore = defineStore('map',()=>{       
    // 移动地图到指定位置
    const moveToCity = (cityLatLng, mapzoom)=>{
        this.map.setView(cityLatLng, mapzoom);
    };

    return (useMapStore,moveToCity)
});
  
