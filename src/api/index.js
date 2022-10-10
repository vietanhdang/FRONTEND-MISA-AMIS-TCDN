import department from "./department";
import employee from "./employee";
import ax from "axios";

const axios = ax.create({
  // Khởi tạo cấu hình cho axios
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const api = {
  // Khởi tạo các api
  department: department(axios),
  employee: employee(axios),
};

export default api;
