<script setup>
import { reactive, onMounted } from "vue";
import { useSuppliersDataStore } from '../../stores/SuppliersData.js'
import axios from "axios";
import SupplierHeader from './Components/SupplierHeader.vue'
import PSite from './Components/PSite.vue'
import "../../assets/js/core/bootstrap.min.js";

//data
let AddSiteModal = null;
let ModifySiteModal = null;
const suppliersDataStore = useSuppliersDataStore();
const modifySiteDate = reactive({
    ProductId: 0,
    SupplierId: 0,
    Name: '',
    Psite: [{
        ProductId: 0,
        SiteId: 0,
        Name: '',
        OpenTime: '',
        Address: '',
        Latitude: '',
        Longitude: '',
        SiteDescription: '',
    }]
})
const currentSiteDate = reactive({
    ProductId: 0,
    SiteId: 0,
    Name: '',
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
    if (regOpenTime.test(currentSiteDate.OpenTime) && currentSiteDate.Name != '' && currentSiteDate.Address != '' && currentSiteDate.Latitude != '' && currentSiteDate.Longitude != '' && currentSiteDate.siteDescription != '' && currentSiteDate.SitePhoto != null) {
        try {
            const res = await axios.post('https://localhost:7073/api/Products/PSite', currentSiteDate, { headers: { 'Content-Type': 'multipart/form-data' } });
            // console.log(res);
            suppliersDataStore.getProduct();
        }
        catch (error) {
            console.log(error)
        }
    }
    else
        alert('輸入格式不正確');
}
const initCurrentSiteDate = () => {
    currentSiteDate.Name = '';
    currentSiteDate.OpenTime = '';
    currentSiteDate.Address = '';
    currentSiteDate.Latitude = '';
    currentSiteDate.Longitude = '';
    currentSiteDate.siteDescription = '';
    currentSiteDate.SitePhoto = null;
}
const addSiteModalOpen = () => {
    initCurrentSiteDate();
    AddSiteModal.show();
}
const addSiteModalClose = () => {
    AddSiteModal.hide();
}
const ModifySiteModalOpen = () => {
    ModifySiteModal.show();
}
const ModifySiteModalClose = () => {
    ModifySiteModal.hide();
}
const ModifySave = async () => {
    try {
        console.log('modifySiteDate', modifySiteDate);
        res = await axios.put(`https://localhost:7073/api/Products/${currentSiteDate.ProductId}`, modifySiteDate, { headers: { 'Content-Type': 'application/json' } });
        // console.log(res);
    }
    catch (error) {
        console.log(error)
    }
    suppliersDataStore.getProduct();
    ModifySiteModalClose();
}
const ModifyPSite = async (func, id) => {
    switch (func) {
        case 'modify':
            initCurrentSiteDate();
            const arraySiteNum = suppliersDataStore.orderBySite.indexOf(id);
            const modalArr = suppliersDataStore.siteAndRoom[arraySiteNum];
            modifySiteDate.ProductId = currentSiteDate.ProductId;
            modifySiteDate.SupplierId = suppliersDataStore.currentSupplierId;
            modifySiteDate.Name = suppliersDataStore.currentSuppliername;
            modifySiteDate.Psite[0].ProductId = currentSiteDate.ProductId;
            modifySiteDate.Psite[0].SiteId = id;
            modifySiteDate.Psite[0].Name = modalArr.name;
            modifySiteDate.Psite[0].OpenTime = modalArr.openTime;
            modifySiteDate.Psite[0].Address = modalArr.address;
            modifySiteDate.Psite[0].Latitude = modalArr.latitude;
            modifySiteDate.Psite[0].Longitude = modalArr.longitude;
            modifySiteDate.Psite[0].SiteDescription = modalArr.siteDescription;
            ModifySiteModalOpen();
            break;
        case 'delete':
            if (confirm('確定要刪除嗎?')) {
                try {
                    await axios.delete(`https://localhost:7073/api/Products/PSite/${id}`);
                    // console.log(res);
                    suppliersDataStore.getProduct();
                }
                catch (error) {
                    console.log(error)
                }
            }
            break;

        default:
            break;
    }

}
const changeSitePhoto = (e) => {
    currentSiteDate.SitePhoto = e.target.files[0];
    // console.log(addSiteDate.SitePhoto);
}

//hook
onMounted(() => {
    AddSiteModal = new bootstrap.Modal(document.getElementById('AddModal'));
    ModifySiteModal = new bootstrap.Modal(document.getElementById('ModifyModal'));
    suppliersDataStore.getProduct();
    currentSiteDate.ProductId = suppliersDataStore.currentProductId;
})
</script>

<template>
    <SupplierHeader label-string="管理站點資訊" />
    <div class="container">
        <div class="row">
            <ul class="list-unstyled d-flex border-bottom">
                <li class="me-4">
                    <h5>站點管理</h5>
                </li>
                <li class="me-4">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-success btn-sm" @click="addSiteModalOpen">新增</button>
                </li>
            </ul>
        </div>
        <PSite v-for="site in suppliersDataStore.siteAndRoom" :Id="site.siteId" :Name="site.name" :Image="site.image"
            :OpenTime="site.openTime" :Address="site.address" :Description="site.siteDescription"
            @funcModify="ModifyPSite" />
    </div>


    <!-- 新增的Modal -->
    <div class="modal fade" id="AddModal" tabindex="-1" aria-labelledby="AddModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AddModalLabel">
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
                            v-model="currentSiteDate.Name">
                    </div>
                    <p>圖片</p>
                    <div class="d-flex mb-3">
                        <input type="file" class="form-control btn-light creditCardText" accept=".jpg,.png"
                            @change="changeSitePhoto">
                    </div>
                    <p>開放時間</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="08:00~22:00"
                            v-model="currentSiteDate.OpenTime">
                    </div>
                    <p>地點</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="請填入地址"
                            v-model="currentSiteDate.Address">
                    </div>
                    <p>經緯度</p>
                    <div class="d-flex mb-3">
                        <input type="number" class="form-control btn-light creditCardText me-3"
                            placeholder="緯度(latitude) S、N" v-model="currentSiteDate.Latitude">
                        <input type="number" class="form-control btn-light creditCardText ms-3"
                            placeholder="經度(longitude) E、W" v-model="currentSiteDate.Longitude">
                    </div>
                    <p>描述</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="簡述介紹這個站點"
                            v-model="currentSiteDate.siteDescription">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="addSiteModalClose">關閉</button>
                    <button type="button" class="btn btn-primary" @click="savePSite">儲存更新</button>
                </div>
            </div>
        </div>
    </div>


    <!-- 修改的Modal -->
    <div class="modal fade" id="ModifyModal" tabindex="-1" aria-labelledby="ModifyModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ModifyModalLabel">
                        <h3>修改</h3>
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
                            v-model="modifySiteDate.Psite[0].Name">
                    </div>
                    <p>新增圖片</p>
                    <div class="d-flex mb-3">
                        <input type="file" class="form-control btn-light creditCardText" accept=".jpg,.png"
                            @change="changeSitePhoto">
                    </div>
                    <p>開放時間</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="08:00~22:00"
                            v-model="modifySiteDate.Psite[0].OpenTime">
                    </div>
                    <p>地點</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="請填入地址"
                            v-model="modifySiteDate.Psite[0].Address">
                    </div>
                    <p>經緯度</p>
                    <div class="d-flex mb-3">
                        <input type="number" class="form-control btn-light creditCardText me-3"
                            placeholder="緯度(latitude) S、N" v-model="modifySiteDate.Psite[0].Latitude">
                        <input type="number" class="form-control btn-light creditCardText ms-3"
                            placeholder="經度(longitude) E、W" v-model="modifySiteDate.Psite[0].Longitude">
                    </div>
                    <p>描述</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="簡述介紹這個站點"
                            v-model="modifySiteDate.Psite[0].SiteDescription">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="ModifySiteModalClose">關閉</button>
                    <button type="button" class="btn btn-primary" @click="ModifySave">儲存更新</button>
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
</style>