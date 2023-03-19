<script setup>
import { reactive, ref, onMounted } from "vue";
import SupplierHeader from './Components/SupplierHeader.vue'
import "../../assets/js/core/bootstrap.min.js";
import PSite from './Components/PSite.vue'

let AddSiteModal = null;

const savePSite = () => {

}
const addSiteModalOpen = () => {
    AddSiteModal.show();
    console.log(AddSiteModal.show);
}
const addSiteModalClose = () => {
    AddSiteModal.hide();
    console.log(AddSiteModal.hide);
}

onMounted(() => {
    AddSiteModal = new bootstrap.Modal(document.getElementById('exampleModal'));
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
        <PSite />
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
                        <input type="text" class="form-control btn-light creditCardText" placeholder="請填入站點名字">
                    </div>
                    <p>圖片</p>
                    <div class="d-flex mb-3">
                        <input type="file" class="form-control btn-light creditCardText">
                    </div>
                    <p>開放時間</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText"
                            placeholder="08:00~12:00,13:00~17:00">
                    </div>
                    <p>地點</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="請填入地址">
                    </div>
                    <p>描述</p>
                    <div class="d-flex mb-3">
                        <input type="text" class="form-control btn-light creditCardText" placeholder="簡述介紹這個站點">
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