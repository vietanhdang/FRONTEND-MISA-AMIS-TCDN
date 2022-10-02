import { createRouter, createWebHistory } from "vue-router";

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

// Khai báo các routes
const router = [
  {
    path: "/",
    redirect: "/nhan-vien",
  },
  {
    path: "/tong-quan",
    component: lazyLoad("example/ComponentExample"),
    meta: {
      title: "Tổng quan",
    },
    sideBar: {
      icon: "ms-icon ms-icon-dashboard",
      title: "Tổng quan",
      order: 1,
    },
  },
  {
    path: "/nhan-vien",
    component: lazyLoad("employee/EmployeeList"),
    meta: {
      title: "Nhân viên",
    },
    sideBar: {
      icon: "ms-icon ms-icon-cash",
      title: "Tiền mặt",
      order: 2,
    },
  },
  {
    path: "/tien-gui",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Tiền gửi",
    },
    sideBar: {
      icon: "ms-icon ms-icon-bank",
      title: "Tiền gửi",
      order: 3,
    },
  },
  {
    path: "/mua-hang",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Mua hàng",
    },
    sideBar: {
      icon: "ms-icon ms-icon-buy",
      title: "Mua hàng",
      order: 4,
    },
  },
  {
    path: "/ban-hang",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Bán hàng",
    },
    sideBar: {
      icon: "ms-icon ms-icon-sell",
      title: "Bán hàng",
      order: 5,
    },
  },
  {
    path: "/quan-ly-hoa-don",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Quản lý hóa đơn",
    },
    sideBar: {
      icon: "ms-icon ms-icon-bill",
      title: "Quản lý hóa đơn",
      order: 6,
    },
  },
  {
    path: "/quan-ly-kho",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Quản lý kho",
    },
    sideBar: {
      icon: "ms-icon ms-icon-warehouse",
      title: "Quản lý kho",
      order: 7,
    },
  },
  {
    path: "/cong-cu",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Công cụ",
    },
    sideBar: {
      icon: "ms-icon ms-icon-tool",
      title: "Công cụ dụng cụ",
      order: 8,
    },
  },
  {
    path: "/tai-san-co-dinh",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Tài sản cố định",
    },
    sideBar: {
      icon: "ms-icon ms-icon-fixed-asset",
      title: "Tài sản cố định",
      order: 9,
    },
  },
  {
    path: "/thue",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Thuế",
    },
    sideBar: {
      icon: "ms-icon ms-icon-tax",
      title: "Thuế",
      order: 10,
    },
  },
  {
    path: "/gia-thanh",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Giá thành",
    },
    sideBar: {
      icon: "ms-icon ms-icon-price",
      title: "Giá thành",
      order: 11,
    },
  },
  {
    path: "/tong-hop",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Tổng hợp",
    },
    sideBar: {
      icon: "ms-icon ms-icon-summary",
      title: "Tổng hợp",
      order: 12,
    },
  },
  {
    path: "/ngan-sach",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Ngân sách",
    },
    sideBar: {
      icon: "ms-icon ms-icon-budget",
      title: "Ngân sách",
      order: 13,
    },
  },
  {
    path: "/bao-cao",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Báo cáo",
    },
    sideBar: {
      icon: "ms-icon ms-icon-report",
      title: "Báo cáo",
      order: 14,
    },
  },
  {
    path: "/phan-tich-tai-chinh",
    component: lazyLoad("update/UpdatePage"),
    meta: {
      title: "Phân tích tài chính",
    },
    sideBar: {
      icon: "ms-icon ms-icon-analysis",
      title: "Phân tích tài chính",
      order: 15,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: lazyLoad("error/ErrorPage"),
    meta: {
      title: "Không tìm thấy trang",
    },
  },
];

// Khởi tạo router
const routes = createRouter({
  history: createWebHistory(),
  routes: router,
});

// Cập nhật meta title cho từng route
routes.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default routes;
