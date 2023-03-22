<script setup>
import { ref, reactive, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useSuppliersDataStore } from '../../../stores/SuppliersData.js'

const suppliersDataStore = useSuppliersDataStore();

const props = defineProps({
    Id: {
        type: Number,
        require: true,
    },
    Image: {
        type: String,
        default: '1.jpg',
    },
    Name: {
        type: String,
        default: '崇明店',
    },
    OpenTime: {
        type: String,
        default: '08:00~22:00',
    },
    Address: {
        type: String,
        default: '701台南市東區崇明路589-7號',
    },
    Description: {
        type: String,
        default: '良好的空間，明亮的燈光',
    },
})

const ot = reactive(['', '']);
const pathPSite = ref('/src/assets/img/PSite/')

const goRoomView = (e) => {
    suppliersDataStore.currentSiteId = e.target.id;
}

onMounted(() => {
    let ar = props.OpenTime.split(',');
    ar.forEach((i, idx) => ot[idx] = ar[idx]);
});

</script>

<template>
    <div class="row border-bottom mb-3">
        <div class="col-4">
            <img name="siteImg" :src="pathPSite + Image" class="w-70" alt="SiteImg">
        </div>
        <div class="col-2">
            <h6>站點名稱</h6>
            <p>{{ props.Name }}</p>
            <h6>開放時間</h6>
            <p class="mb-0">{{ ot[0] }}&ensp;{{ ot[1] }}</p>
        </div>
        <div class="col-4">
            <h6>地址</h6>
            <p>{{ props.Address }}</p>
            <h6>描述</h6>
            <p class="mb-0">{{ props.Description }}</p>
        </div>
        <div class="col-2">
            <button class="btn btn-dark btn-sm" @click="">修改</button>
            <br />
            <button class="btn btn-danger btn-sm" @click="">刪除</button>
            <br />
            <RouterLink :to="{ name: 'addRoom' }"><button :id="props.Id" @click="goRoomView"
                    class="btn btn-info btn-sm">房管</button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>