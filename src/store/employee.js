import axios from "axios";
/**
 * @description: Tạo store lưu trữ các giá trị liên quan đến nhân viên
 * Author: AnhDV 02/10/2022
 */
const employee = {
  state: {
    listEmployeeSelected: [], // danh sách nhân viên được chọn
  },
  mutations: {
    /**
     * @description: Thêm nhân viên vào danh sách nhân viên được chọn
     * @param: {state} state của store
     * @param: {employeeList} danh sách nhân viên được chọn
     * Author: AnhDV 02/10/2022
     */
    setEmployeeSelected(state, employeeList) {
      state.listEmployeeSelected = employeeList;
    },
  },
  actions: {
    /**
     * @description: Xóa nhân viên khỏi danh sách nhân viên được chọn
     * @param: {any}
     * Author: AnhDV 06/10/2022
     */
    async deleteMultipleEmployee({ commit, getters }) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}employees/delete-multiple`,
          getters.getListEmployeeSelected
        );
        if (res) {
          commit("setEmployeeSelected", []);
          return res.data;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  getters: {
    /**
     * @description: Lấy danh sách nhân viên được chọn
     * @param: {state} state của store
     * Author: AnhDV 02/10/2022
     * @example: this.$store.getters.getListEmployeeSelected;
     * @return: danh sách nhân viên được chọn
     * Author: AnhDV 02/10/2022
     */
    getListEmployeeSelected(state) {
      return state.listEmployeeSelected;
    },

    /**
     * @description: Xem trong danh sách nhân viên được chọn có nhân viên nào không
     * @param: {state} state của store
     * Author: AnhDV 02/10/2022
     * @example: this.$store.getters.isEmployeeSelected;
     * @return: true nếu có nhân viên được chọn, false nếu không có nhân viên nào được chọn
     * Author: AnhDV 02/10/2022
     */
    isEmployeeSelected(state) {
      return state.listEmployeeSelected.length > 0;
    },
  },
};

export default employee;
