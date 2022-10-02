import { createApp } from "vue";
import App from "@/App.vue";
import routes from "@/router";
import components from "@/components";
import "@/assets/css/main.css";
import store from "@/store/store";
import tcdn_dva from "@/api";

const app = createApp(App); // Khởi tạo app

app.use(routes); // Sử dụng router

Object.keys(components).forEach((key) => {
  app.component(key, components[key]); // Đăng ký các component
});

app.config.globalProperties.$api = tcdn_dva; // Đăng ký api

app.use(store); // Sử dụng store

app.mount("#app"); // Mount app vào DOM
