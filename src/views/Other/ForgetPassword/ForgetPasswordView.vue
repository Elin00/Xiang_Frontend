<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import { ref } from "vue";


const email = ref('');
const showSendButton = ref(true);

const sendEmail = async () => {
    const response = await axios.post('https://localhost:7073/api/Client/ResetPassword', {email: email.value }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    showSendButton.value = false;
};

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="d-flex align-items-center justify-content-center">
                <h2>忘記密碼</h2>
            </div>
            <div class="d-flex align-items-center justify-content-center " style="">
                <h6 style="color:grey;">Forgot Password</h6>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-5">
                <p style="text-align: center;">請輸入您註冊時的電子郵件，我們將向您發送重設密碼的說明<br>
                    為確保網路安全疑慮，忘記密碼時需重新設置新密碼，我們不會透過電子郵件發送您的舊密碼</p>
            </div>
            <div v-if="showSendButton" class="d-flex align-items-center justify-content-center form-group mt-5">
                <label for="email-input" class="mr-3" style="font-size: 18px;margin-bottom: -0.1rem;">電子信箱:</label>
                <input id="email-input" type="text" v-model="email" class="form-control" placeholder="請輸入信箱">
            </div>
            <div class="d-flex align-items-center justify-content-center form-group mt-5">
                <button v-if="showSendButton" @click="sendEmail" type="submit" class="btn btn-primary btn-lg ml-2"
                    style="font-size: 20px; border-radius: 10px; background-color: #007bff; color: #fff;">確認送出</button>
                <span style="margin-left:20px;"></span>
                <router-link v-if="showSendButton" :to="{ name: 'presentation' }" class="btn btn-primary btn-lg"
                    style="font-size: 20px; border-radius: 10px; background-color: #007bff; color: #fff;">
                    返回首頁
                </router-link>
            </div>
            <div v-if="!showSendButton" class="checkmark-container">
                <i class="material-icons" style="font-size: 72px; color: green;">check_circle</i>
                <p>您將收到我們重設密碼的電子信件，信件中將有為您預設的新密碼。</p>
                <p>請使用預設密碼做重新登入，再作後續重設密碼等動作，謝謝!</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 設定 input 的寬度、高度和邊框 */
input {
    width: 300px;
    height: 40px;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
}

/* 當 input 被選中時，變更邊框顏色 */
input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 10px #007bff;
}

/* 設定 input 的背景顏色和文字顏色 */
input {
    background-color: #f8f8f8;
    color: #333;
}

/* 設定 placeholder 的顏色 */
input::placeholder {
    color: #999;
}

.checkmark-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>