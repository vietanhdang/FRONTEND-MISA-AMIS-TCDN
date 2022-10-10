const PREFIX_EMPLOYEE = "employees";
export default (axios) => ({
  /**
   * @description: Lấy mã nhân viên mới
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  getNewEmployeeCode() {
    return axios.get(`${PREFIX_EMPLOYEE}/new-employee-code`);
  },

  /**
   * @description: Lấy chi tiết nhân viên
   * @param {String} employeeId Id nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  getEmployeeById(employeeId) {
    return axios.get(`${PREFIX_EMPLOYEE}/${employeeId}`);
  },

  /**
   * @description: Lấy danh sách nhân viên theo filter
   * @param {Object} filter Đối tượng filter
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  getEmployeesFilter(object) {
    var defaultObject = {
      pageNumber: 1,
      pageSize: 10,
      keyword: "",
    };
    object = Object.assign(defaultObject, object);
    return axios.get(`${PREFIX_EMPLOYEE}/filter`, {
      params: {
        pageNumber: object.pageNumber,
        pageSize: object.pageSize,
        keyword: object.keyword,
      },
    });
  },

  /**
   * @description: Xóa nhân viên
   * @param {String} employeeId Id nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  deleteEmployee(employeeId) {
    return axios.delete(`${PREFIX_EMPLOYEE}/${employeeId}`);
  },

  /**
   * @description: Thêm mới nhân viên
   * @param {Object} employee Đối tượng nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  insertEmployee(object) {
    return axios.post(`${PREFIX_EMPLOYEE}`, object);
  },

  /**
   * @description: Cập nhật nhân viên
   * @param {Object} employee Đối tượng nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  updateEmployee(object) {
    return axios.put(`${PREFIX_EMPLOYEE}/${object.employeeID}`, object);
  },
  /**
   * @description: Export danh sách nhân viên
   * Author: AnhDV 05/10/2022
   */
  exportEmployees() {
    return axios.get(`${PREFIX_EMPLOYEE}/export`, {
      responseType: "blob",
    });
  },
});
