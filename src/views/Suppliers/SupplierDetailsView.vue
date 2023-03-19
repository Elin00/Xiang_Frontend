<script setup>
import { onMounted, ref, watch } from "vue";
import { useSuppliersDataStore } from "../../stores/SuppliersData.js";


const Suppliersstore = useSuppliersDataStore();

</script>

<template>
    <div>
        <h4>個人資料修改</h4>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">名字</label>
                <input type="text" id="name" v-model="Suppliersstore.name.value">
            </div>
            <div>
                <label for="phone">電話</label>
                <input type="text" id="phone" v-model="Suppliersstore.phone.value">
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="Suppliersstore.email.value">
            </div>
            <div>
                <label for="password">密碼</label>
                <input type="password" id="password" v-model="Suppliersstore.password.value">
            </div>
            <button type="submit">確認修改</button>
        </form>
    </div>
</template>