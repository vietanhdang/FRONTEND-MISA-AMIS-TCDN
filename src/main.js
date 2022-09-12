import { createApp } from "vue";
import App from "@/App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router";
import components from "@/components";
import "@/assets/css/main.css";

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

app.mount("#app"); // Mount app vào DOM

