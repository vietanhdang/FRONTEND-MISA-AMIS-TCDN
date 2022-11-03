export default (axios, api) => ({
  /**
   * @description: Hàm lấy toàn bộ dữ liệu
   * @param callback Hàm callback
   * Author: AnhDV 26/10/2022
   */
  async getAll(callback = () => {}) {
    try {
      const response = await axios.get(api);
      callback(response);
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @description: Lấy dữ liệu theo id
   * @param {string} id
   * @param {function} callback
   * Author: AnhDV 26/10/2022
   */
  async getById(id, callback = () => {}, failCallback = () => {}) {
    try {
      const response = await axios.get(`${api}/${id}`);
      callback(response);
    } catch (error) {
      failCallback(error);
    }
  },

  /**
   * Hàm lưu dữ liệu
   * @param {object} data Dữ liệu cần lưu
   * @param {function} callback Hàm callback
   * @param {function} failCallback Hàm callback khi lưu thất bại
   * @param {function} completeCallback Hàm callback khi lưu xong
   * Author: AnhDV 26/10/2022
   */
  async save(data, callback = function () {}, failCallback = function () {}, completeCallback = function () {}) {
    try {
      const response = await axios.post(api, data);
      callback(response);
    } catch (error) {
      failCallback(error);
    } finally {
      completeCallback();
    }
  },

  /**
   * Hàm dùng để cập nhật dữ liệu
   * @param {object} data Dữ liệu cần cập nhật
   * @param {string} id Id của bản ghi cần cập nhật
   * @param {function} callback Hàm callback
   * @param {function} failCallback Hàm callback khi lưu thất bại
   * @param {function} completeCallback Hàm callback khi lưu xong
   * Author: AnhDV 26/10/2022
   */
  async update(data, id, callback = function () {}, failCallback = function () {}, completeCallback = function () {}) {
    try {
      const response = await axios.put(`${api}/${id}`, data);
      callback(response);
    } catch (error) {
      failCallback(error);
    } finally {
      completeCallback();
    }
  },

  /**
   * @description: Hàm xóa dữ liệu theo id
   * @param {string} id
   * @param {function} callback
   * @param: {any}
   * Author: AnhDV 26/10/2022
   */
  async deleteById(id, callback = () => {}, failCallback = () => {}) {
    try {
      const response = await axios.delete(`${api}/${id}`);
      callback(response);
    } catch (error) {
      failCallback(error);
    }
  },

  /**
   * @description: Hàm xóa nhiều bản ghi
   * @param {array} ids
   * @param {function} callback
   * @param: {function} failCallback
   * @param: {any}
   * Author: AnhDV 26/10/2022
   */
  async deleteMultiple(ids, callback = () => {}, failCallback = () => {}) {
    try {
      const response = await axios.delete(`${api}/delete-multiple`, {
        data: ids,
      });
      callback(response);
    } catch (error) {
      failCallback(error);
    }
  },

  /**
   * @description: Hàm lấy mã mới
   * @param: {any}
   * Author: AnhDV 26/10/2022
   */
  async getNewCode() {
    try {
      const response = await axios.get(`${api}/new-code`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * @description: Lấy danh sách dữ liệu theo trang và điều kiện
   * @param {number} pageNumber
   * @param {number} pageSize
   * @param {object} filter
   * @param {function} callback
   * Author: AnhDV 26/10/2022
   */
  async getAllPaging(pageNumber, pageSize, filter, callback = () => {}) {
    try {
      const response = await axios.get(`${api}/filter/v2`, {
        params: {
          pageNumber,
          pageSize,
          ...filter,
        },
      });
      callback(response);
    } catch (error) {
      console.log(error);
    }
  },
});
