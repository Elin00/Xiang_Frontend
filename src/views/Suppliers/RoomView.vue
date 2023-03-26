<script setup>
import { ref, reactive, onMounted } from "vue";
import { useSuppliersDataStore } from '../../stores/SuppliersData.js'
import axios from "axios";
import SupplierHeader from './Components/SupplierHeader.vue'
import PRoom from './Components/PRoom.vue'
import "../../assets/js/core/bootstrap.min.js";

const suppliersDataStore = useSuppliersDataStore();

//data
let AddRoomModal = null;
let ModalRoomModal = null;
const currentRoomDate = reactive({
    roomId: 0,
    siteId: 0,
    categoryId: 0,
    ping: '',
    datePrice: '',
    hourPrice: '',
    roomDescription: '',
    roomPhoto: null,
    iframe: ''
})
const currentSiteRoom = reactive([]);
const arraySiteNum = ref(0);
const orderByRoom = [];

//function
const initCurrentRoomDate = () => {
    currentRoomDate.ping = '';
    currentRoomDate.datePrice = '';
    currentRoomDate.hourPrice = '';
    currentRoomDate.roomDescription = '';
    currentRoomDate.roomPhoto = null;
}
const addSaveRoom = async () => {
    if (currentRoomDate.categoryId != 0 && currentRoomDate.ping != '' && currentRoomDate.datePrice != '' && currentRoomDate.hourPrice != '' && currentRoomDate.roomDescription != '' && currentRoomDate.roomPhoto != null && currentRoomDate.iframe != null) {
        try {
            const res = await axios.post('https://localhost:7073/api/Products/PSiteRoom', currentRoomDate, { headers: { 'Content-Type': 'multipart/form-data' } });
            suppliersDataStore.getProduct();

            setTimeout(() => {
                Object.assign(currentSiteRoom, suppliersDataStore.siteAndRoom[arraySiteNum.value]);
                addRoomModalClose();
            }, 50);
        }
        catch (error) {
            console.log(error)
        }
    }
    else
        alert('輸入格式不正確');
}
const ModifySaveRoom = async () => {
    if (currentRoomDate.categoryId != 0 && currentRoomDate.ping != '' && currentRoomDate.datePrice != '' && currentRoomDate.hourPrice != '' && currentRoomDate.roomDescription != '') {
        try {
            const res = await axios.put(`https://localhost:7073/api/PsiteRooms/${currentRoomDate.roomId}`, currentRoomDate, { headers: { 'Content-Type': 'application/json' } });
            suppliersDataStore.getProduct();

            setTimeout(() => {
                Object.assign(currentSiteRoom, suppliersDataStore.siteAndRoom[arraySiteNum.value]);
                console.log('currentSiteRoomModify', currentSiteRoom);
            }, 50);
            addRoomModalClose();
        }
        catch (error) {
            console.log(error)
        }
        ModifyRoomModalClose();
    }
    else
        alert('輸入格式不正確');
}
const ModifyRoomModalOpen = () => {
    initCurrentRoomDate();
    ModalRoomModal.show();
}
const ModifyRoomModalClose = () => {
    ModalRoomModal.hide();
}
const addRoomModalOpen = () => {
    initCurrentRoomDate();
    AddRoomModal.show();
}
const addRoomModalClose = () => {
    AddRoomModal.hide();
}
const changeRoomPhoto = (e) => {
    currentRoomDate.roomPhoto = e.target.files[0];
    console.log(currentRoomDate.roomPhoto);
}
const ModifyPSiteRoom = async (func, id) => {
    switch (func) {
        case 'modify':
            initCurrentRoomDate();
            const arrayRoomNum = orderByRoom.indexOf(id);
            const modalArr = currentSiteRoom.psiteRoom[arrayRoomNum];

            setTimeout(() => {
                console.log('modalArr', modalArr);
                currentRoomDate.roomId = modalArr.roomId;
                currentRoomDate.categoryId = modalArr.categoryId;
                currentRoomDate.ping = modalArr.ping;
                currentRoomDate.datePrice = modalArr.datePrice;
                currentRoomDate.hourPrice = modalArr.hourPrice;
                currentRoomDate.roomDescription = modalArr.roomDescription;
                currentRoomDate.iframe = modalArr.iframe
            }, 50)
            ModifyRoomModalOpen();
            break;
        case 'delete':
            if (confirm('確定要刪除嗎?')) {
                try {
                    await axios.delete(`https://localhost:7073/api/Products/PSiteRoom/${id}`);
                    suppliersDataStore.getProduct();

                    setTimeout(() => {
                        Object.assign(currentSiteRoom, suppliersDataStore.siteAndRoom[arraySiteNum.value]);
                    }, 50);
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

//hook
onMounted(() => {
    suppliersDataStore.getCategory();

    //不使用 setTimeout delay 一下就抓不到值
    setTimeout(() => {
        AddRoomModal = new bootstrap.Modal(document.getElementById('AddRoomModal'));
        ModalRoomModal = new bootstrap.Modal(document.getElementById('ModalRoomModal'));
        currentRoomDate.siteId = suppliersDataStore.currentSiteId;
        arraySiteNum.value = suppliersDataStore.orderBySite.indexOf(suppliersDataStore.currentSiteId);

        Object.assign(currentSiteRoom, suppliersDataStore.siteAndRoom[arraySiteNum.value]);
        currentSiteRoom.psiteRoom.forEach(room => {
            orderByRoom.push(room.roomId.toString());
        })
        if (suppliersDataStore.allCategory.length != 0)
            currentRoomDate.categoryId = 1;

        console.log('allCategory', suppliersDataStore.allCategory);
        console.log('psiteRoom', currentSiteRoom.psiteRoom);
    }, 50)
})
</script>

<template>
    <h1>{{ suppliersDataStore.a }}</h1>
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
        <PRoom v-for="room in currentSiteRoom.psiteRoom" :Id="room.roomId"
            :CategoryName="suppliersDataStore.allCategory[room.categoryId - 1].name" :HourPrice="room.hourPrice"
            :DatePrice="room.datePrice" :Image="room.image" :Ping="room.ping" :Description="room.roomDescription"
            @funcModify="ModifyPSiteRoom" />
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
                            <option v-for="item in suppliersDataStore.allCategory" :value="item.categoryId">{{ item.name }}
                            </option>
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
                        <input type="number" class="form-control btn-light creditCardText"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="請填入坪數"
                            v-model="currentRoomDate.ping">
                    </div>
                    <p>房間描述</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="簡述介紹這個房間"
                            v-model="currentRoomDate.roomDescription">
                    </div>
                    <p>iframe</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="google iframe"
                            v-model="currentRoomDate.iframe">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="addRoomModalClose">關閉</button>
                    <button type="button" class="btn btn-primary" @click="addSaveRoom">儲存更新</button>
                </div>
            </div>
        </div>
    </div>


    <!-- 修改的 Room 的 Modal -->
    <div class="modal fade" id="ModalRoomModal" tabindex="-1" aria-labelledby="ModalRoomModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ModalRoomModalLabel">
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
                            <option v-for="item in suppliersDataStore.allCategory" :value="item.categoryId">{{ item.name }}
                            </option>
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
                        <input type="number" class="form-control btn-light creditCardText"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="請填入坪數"
                            v-model="currentRoomDate.ping">
                    </div>
                    <p>房間描述</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="簡述介紹這個房間"
                            v-model="currentRoomDate.roomDescription">
                    </div>
                    <p>iframe</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="google iframe"
                            v-model="currentRoomDate.iframe">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="ModifyRoomModalClose">關閉</button>
                    <button type="button" class="btn btn-primary" @click="ModifySaveRoom">儲存更新</button>
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