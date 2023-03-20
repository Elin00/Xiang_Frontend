import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'

import { useCustomerStore } from '../src/stores/CustomerData.js'


// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'element-plus/dist/index.css';
import materialKit from "./material-kit";

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

const app = createApp(App);
const pinia = createPinia();
const CustomerStore = useCustomerStore(pinia);
app.use(createPinia());

// 從 localStorage 讀取使用者資訊
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  CustomerStore.Name = user.Name;
  CustomerStore.loggedIn = true;
}


app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.use(materialKit);
app.mount("#app");