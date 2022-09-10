import CompEmployeeList from "@/views/employee/EmployeeList";
import CompTestVueRouter from "@/views/employee/TestVueRouter";

// Khai báo các routes
const router = [
  {
    path: "/nhan-vien",
    component: CompEmployeeList,
    meta: {
      title: "Danh sách nhân viên",
    },
  },
  {
    path: "/khach-hang",
    component: CompTestVueRouter,
    meta: {
      title: "Danh sách khách hàng",
    },
  },
];

export default router;
