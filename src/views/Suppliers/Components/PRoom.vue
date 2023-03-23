<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['funcModify']);

const props = defineProps({
    Id: {
        type: Number,
        require: true,
    },
    Image: {
        type: String,
        default: '1.jpg',
    },
    CategoryName: {
        type: String,
        default: '工作',
    },
    Ping: {
        type: Number,
        default: 0,
    },
    HourPrice: {
        type: Number,
        default: 0,
    },
    DatePrice: {
        type: Number,
        default: 0,
    },
    Description: {
        type: String,
        default: '好房間',
    },
})

const pathPSiteRoom = ref('/src/assets/img/PSiteRoom/')

const ClickModify = (e) => {
    const clickRoomId = e.target.parentNode.getAttribute('name');
    const clickfunc = e.target.getAttribute('name');
    emit('funcModify', clickfunc, clickRoomId);
}

onMounted(() => {

});

</script>

<template>
    <div class="row border-bottom mb-3">
        <div class="col-4">
            <img :src="pathPSiteRoom + Image" class="w-70" alt="RoomImg">
        </div>
        <div class="col-2">
            <h6>空間類型</h6>
            <p>{{ props.CategoryName }}</p>
            <h6>價格</h6>
            <p>{{ HourPrice }}/時,&ensp;{{ DatePrice }}/天</p>
        </div>
        <div class="col-4">
            <h6>坪數</h6>
            <p>{{ props.Ping }}</p>
            <h6>描述</h6>
            <p class="mb-0">{{ props.Description }}</p>
        </div>
        <div :name="props.Id" class="col-2">
            <button name="modify" class="btn btn-dark btn-sm" @click="ClickModify">修改</button>
            <br />
            <button name="delete" class="btn btn-danger btn-sm" @click="ClickModify">刪除</button>
        </div>
    </div>
</template>

<style scoped></style>