import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'



const googleAuthOptions = {
  clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // Replace with your client ID
  scope: 'profile email',
  prompt: 'select_account',
};
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
  CustomerStore.id = user.id;
  CustomerStore.loggedIn = true;
}

app.use(ElementPlus);
app.use(router);
app.use(materialKit);
app.mount("#app");