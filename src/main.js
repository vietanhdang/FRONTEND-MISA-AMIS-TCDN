import { createApp } from "vue";
import App from "@/App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router";
import components from "@/components";
import "@/assets/css/main.css";
import { store } from "@/store/store";
import tcdn_dva from "@/api";
import VTooltip from "v-tooltip";

const app = createApp(App); // Khởi tạo app
const router = createRouter({
  history: createWebHistory(),
  routes,
}); // Khởi tạo router
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
}); // Cập nhật meta title cho từng route
app.use(router); // Sử dụng router

Object.keys(components).forEach((key) => {
  app.component(key, components[key]); // Đăng ký các component
});
app.use(store); // Sử dụng store
app.config.globalProperties.$api = tcdn_dva; // Đăng ký api
app.use(VTooltip); // Sử dụng tooltip
app.mount("#app"); // Mount app vào DOM
