import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'element-plus/dist/index.css';
import materialKit from "./material-kit";

const app = createApp(App);
const pinia = createPinia();
app.use(createPinia());

app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.use(materialKit);
app.mount("#app");
