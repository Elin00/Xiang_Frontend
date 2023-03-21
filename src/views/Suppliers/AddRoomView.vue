<script setup>
import { reactive, onMounted } from "vue";
import { useSuppliersDataStore } from '../../stores/SuppliersData.js'
import axios from "axios";
import SupplierHeader from './Components/SupplierHeader.vue'
import PSite from './Components/PSite.vue'
import "../../assets/js/core/bootstrap.min.js";

//data
const suppliersDataStore = useSuppliersDataStore();
let AddSiteModal = null;
const addSiteDate = reactive({
    ProductId: 3,
    Name: '',
    Image: '',
    OpenTime: '',
    Address: '',
    Latitude: '',
    Longitude: '',
    siteDescription: '',
})

//function
const savePSite = async () => {
    try {
        const res = await axios.post('https://localhost:7073/api/Products/PSite', addSiteDate, { headers: { 'Content-Type': 'application/json' } });
        console.log(res);
    }
    catch (error) {
        console.log(error)
    }
}
const addSiteModalOpen = () => {
    AddSiteModal.show();
    // console.log(AddSiteModal.show);
}
const addSiteModalClose = () => {
    AddSiteModal.hide();
    // console.log(AddSiteModal.hide);
}

//hook
onMounted(() => {
    AddSiteModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    suppliersDataStore.getProduct();
})
</script>

<template>
    <SupplierHeader label-string="產品資訊" />
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
        <PSite v-for="site in suppliersDataStore.siteAndRoom" :Name="site.name" :Image="site.image"
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
                        <input type="file" class="form-control btn-light creditCardText">
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
                        <input type="text" class="form-control btn-light creditCardText me-3" placeholder="緯度(latitude) S、N"
                            v-model="addSiteDate.Latitude">
                        <input type="text" class="form-control btn-light creditCardText ms-3"
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
                    <button type="button" id="aa" class="btn btn-primary" @click="savePSite">儲存更新</button>
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
</style>