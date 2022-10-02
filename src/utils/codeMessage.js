/**
 * @description: liệt kê các mã lỗi và thông báo lỗi tương ứng liên quan tới server
 * Author: AnhDV 24/09/2022
 */
export const serverMessage = {
  server_000: "Không thể kết nối đến máy chủ",
};

/**
 * @description: liệt kê các mã lỗi và thông báo lỗi tương ứng liên quan tới employee
 * Author: AnhDV 24/09/2022
 */
export const employeeMessage = {
  employee_001: "Mã nhân viên đã tồn tại trong hệ thống",
  employee_002: "Mã nhân viên không được để trống",
  employee_003: "Tên nhân viên không được để trống",
  employee_004: "Đơn vị không được để trống",
};

export default {
  serverMessage,
  employeeMessage,
};
