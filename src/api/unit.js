const PREFIX_UNIT = "units";
export default (axios) => ({
  /**
   * @description: Lấy chi tiết nhân viên
   * @param {String} unitId Id nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  getUnitById(unitId) {
    return axios.get(`${PREFIX_UNIT}/${unitId}`);
  },

  /**
   * @description: Lấy danh sách nhân viên theo filter
   * @param {Object} filter Đối tượng filter
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  getUnitsFilter(object) {
    var defaultObject = {
      pageNumber: 1,
      pageSize: 10,
      keyword: "",
    };
    object = Object.assign(defaultObject, object);
    return axios.get(`${PREFIX_UNIT}/filter`, {
      params: {
        pageNumber: object.pageNumber,
        pageSize: object.pageSize,
        keyword: object.keyword,
      },
    });
  },

  /**
   * @description: Xóa nhân viên
   * @param {String} unitId Id nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  deleteUnit(unitId) {
    return axios.delete(`${PREFIX_UNIT}/${unitId}`);
  },

  /**
   * @description: Thêm mới nhân viên
   * @param {Object} unit Đối tượng nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  insertUnit(object) {
    return axios.post(`${PREFIX_UNIT}`, object);
  },

  /**
   * @description: Cập nhật nhân viên
   * @param {Object} unit Đối tượng nhân viên
   * @return {Promise} Promise
   * Author: AnhDV 04/10/2022
   */
  updateUnit(object) {
    return axios.put(`${PREFIX_UNIT}/${object.unitID}`, object);
  },
  /**
   * @description: Export danh sách nhân viên
   * Author: AnhDV 05/10/2022
   */
  exportUnits() {
    return axios.get(`${PREFIX_UNIT}/export`, {
      responseType: "blob",
    });
  },
});
