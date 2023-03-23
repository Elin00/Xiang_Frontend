<script setup>
import { reactive, onMounted } from "vue";
import { useSuppliersDataStore } from '../../stores/SuppliersData.js'
import axios from "axios";
import SupplierHeader from './Components/SupplierHeader.vue'
import PRoom from './Components/PRoom.vue'
import "../../assets/js/core/bootstrap.min.js";

const suppliersDataStore = useSuppliersDataStore();

//data
let AddRoomModal = null;
const currentRoomDate = reactive({
    siteId: 0,
    categoryId: 0,
    OpenTime: '',
    ping: '',
    datePrice: '',
    hourPrice: '',
    roomPassWord: '',
    roomDescription: '',
    roomPhoto: null
})

//function
const saveRoom = async () => {
    if (currentRoomDate.categoryId != 0 && currentRoomDate.ping != '' && currentRoomDate.datePrice != '' && currentRoomDate.hourPrice != '' && currentRoomDate.roomDescription != '' && currentRoomDate.roomPhoto != null) {
        try {
            const res = await axios.post('https://localhost:7073/api/Products/PSite', currentRoomDate, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log(res);
        }
        catch (error) {
            console.log(error)
        }
    }
    else
        alert('輸入格式不正確');
}
const addRoomModalOpen = () => {
    AddRoomModal.show();
    // console.log(AddSiteModal.show);
}
const addRoomModalClose = () => {
    AddRoomModal.hide();
    // console.log(AddSiteModal.hide);
}
const changeRoomPhoto = (e) => {
    currentRoomDate.roomPhoto = e.target.files[0];
    console.log(currentRoomDate.roomPhoto);
}

//hook
onMounted(() => {
    AddRoomModal = new bootstrap.Modal(document.getElementById('AddRoomModal'));
    const arraySiteNum = suppliersDataStore.orderBySite.indexOf(suppliersDataStore.currentSiteId);
    console.log(suppliersDataStore.siteAndRoom[arraySiteNum]);
    suppliersDataStore.getCategory();
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
                    <button type="button" class="btn btn-success btn-sm" @click="addRoomModalOpen">新增</button>
                </li>
            </ul>
        </div>
        <PRoom v-for="room in suppliersDataStore.siteAndRoom" :Id="room.siteId" :Name="room.name" :Image="room.image"
            :OpenTime="room.openTime" :Address="room.address" :Description="room.siteDescription" />
    </div>


    <!-- 新增 Room 的 Modal -->
    <div class="modal fade" id="AddRoomModal" tabindex="-1" aria-labelledby="AddRoomModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AddRoomModalLabel">
                        <h3>新增房間</h3>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>
                        房間資訊
                    </h5>
                    <p>房間類型</p>
                    <div class="d-flex mb-3">
                        <select class="form-select btn-light creditCardText" v-model="currentRoomDate.categoryId">
                            <option v-for="item in suppliersDataStore.allCategory" :value="item.categoryId"
                                :selected="true">{{ item.name }}</option>
                        </select>
                    </div>
                    <p>圖片</p>
                    <div class="d-flex mb-3">
                        <input type="file" class="form-control btn-light creditCardText" accept=".jpg,.png"
                            @change="changeRoomPhoto">
                    </div>
                    <div class="d-flex mb-3">
                        <div class="col-6 p-1">
                            <p>以日定價</p>
                            <input type="number" class="form-control btn-light creditCardText" placeholder="$$$$$$"
                                v-model="currentRoomDate.datePrice">
                        </div>
                        <div class="col-6 p-1">
                            <p>以時定價</p>
                            <input type="number" class="form-control btn-light creditCardText" placeholder="$$$$$$"
                                v-model="currentRoomDate.hourPrice">
                        </div>
                    </div>
                    <p>坪數</p>
                    <div class="d-flex mb-3">
                        <input type="number" class="form-control btn-light creditCardText" placeholder="請填入坪數"
                            v-model="currentRoomDate.ping">
                    </div>
                    <p>房間描述</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="簡述介紹這個房間"
                            v-model="currentRoomDate.roomDescription">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="addRoomModalClose">關閉</button>
                    <button type="button" class="btn btn-primary" @click="saveRoom">儲存更新</button>
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