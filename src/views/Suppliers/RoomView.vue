<script setup>
import { reactive, onMounted } from "vue";
import { useSuppliersDataStore } from '../../stores/SuppliersData.js'
import axios from "axios";
import SupplierHeader from './Components/SupplierHeader.vue'
import PRoom from './Components/PRoom.vue'
import "../../assets/js/core/bootstrap.min.js";

//data
let AddSiteModal = null;
const suppliersDataStore = useSuppliersDataStore();
const addSiteDate = reactive({
    ProductId: 3,
    Name: '',
    Image: '',
    OpenTime: '',
    Address: '',
    Latitude: '',
    Longitude: '',
    siteDescription: '',
    SitePhoto: null
})

//regular
const regOpenTime = /^\d{2}:\d{2}~\d{2}:\d{2}$/;

//function
const savePSite = async () => {
    if (regOpenTime.test(addSiteDate.OpenTime) && addSiteDate.Name != '' && addSiteDate.Address != '' && addSiteDate.Latitude != '' && addSiteDate.Longitude != '' && addSiteDate.siteDescription != '' && addSiteDate.SitePhoto != null) {
        try {
            const res = await axios.post('https://localhost:7073/api/Products/PSite', addSiteDate, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log(res);
        }
        catch (error) {
            console.log(error)
        }
    }
    else
        alert('輸入格式不正確');
}
const addSiteModalOpen = () => {
    AddSiteModal.show();
    // console.log(AddSiteModal.show);
}
const addSiteModalClose = () => {
    AddSiteModal.hide();
    // console.log(AddSiteModal.hide);
}
const changeg = (e) => {
    addSiteDate.SitePhoto = e.target.files[0];
    console.log(addSiteDate.SitePhoto);
}

//hook
onMounted(() => {
    AddSiteModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    suppliersDataStore.getProduct();
    // console.log(suppliersDataStore.siteAndRoom);
})
</script>

<template>
    <SupplierHeader label-string="房間資訊" />
    <div class="container">
        <div class="row">
            <ul class="list-unstyled d-flex border-bottom">
                <li class="me-4">
                    <h5>房間管理</h5>
                </li>
                <li class="me-4">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-success btn-sm" @click="addSiteModalOpen">新增</button>
                </li>
            </ul>
        </div>
        <PRoom v-for="site in suppliersDataStore.siteAndRoom" :Id="site.siteId" :Name="site.name" :Image="site.image"
            :OpenTime="site.openTime" :Address="site.address" :Description="site.siteDescription" />
    </div>


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <h3>新增站點</h3>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>
                        站點資訊
                    </h5>
                    <p>站點名稱</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="請填入站點名字"
                            v-model="addSiteDate.Name">
                    </div>
                    <p>圖片</p>
                    <div class="d-flex mb-3">
                        <input type="file" class="form-control btn-light creditCardText" accept=".jpg,.png"
                            @change="changeg">
                    </div>
                    <p>開放時間</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="08:00~22:00"
                            v-model="addSiteDate.OpenTime">
                    </div>
                    <p>地點</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="請填入地址"
                            v-model="addSiteDate.Address">
                    </div>
                    <p>經緯度</p>
                    <div class="d-flex mb-3">
                        <input type="number" class="form-control btn-light creditCardText me-3"
                            placeholder="緯度(latitude) S、N" v-model="addSiteDate.Latitude">
                        <input type="number" class="form-control btn-light creditCardText ms-3"
                            placeholder="經度(longitude) E、W" v-model="addSiteDate.Longitude">
                    </div>
                    <p>描述</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="簡述介紹這個站點"
                            v-model="addSiteDate.siteDescription">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="addSiteModalClose">關閉</button>
                    <button type="button" class="btn btn-primary" @click="savePSite">儲存更新</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h5 {
    color: gray;
}

.creditCardText {
    text-align: center;
    border: 1px solid gray;
}

input::placeholder {
    text-align: center;
}

/* 隱藏input number 的 Arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>