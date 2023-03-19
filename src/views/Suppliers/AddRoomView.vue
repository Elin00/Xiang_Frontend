<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useSuppliersDataStore } from "../../stores/SuppliersData.js";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";



import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
    console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
    console.log(file)
}

const Suppliersstore = useSuppliersDataStore();

</script>

<template>
    <div style="margin-left: 10%;">
        <h4>請填寫您的空間資訊</h4>
        <h5>上傳您的空間照片</h5>
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <el-icon>
                <Plus />
            </el-icon>

            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                            <el-icon>
                                <Download />
                            </el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </span>
                    </span>
                </div>
            </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

    </div>
</template>
<style></style>