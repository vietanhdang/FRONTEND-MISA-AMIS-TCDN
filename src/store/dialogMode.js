/**
 * @description: Tạo store lưu trữ các mode của dialog (thêm, sửa, xóa)
 * Author: AnhDV 02/10/2022
 */
const dialogMode = {
  state: {
    mode: null, // mode của dialog (thêm, sửa, xóa)
    employeeId: null, // id của nhân viên
  },
  mutations: {
    /**
     * @description: Thay đổi mode của dialog
     * @param: {state} state của store
     * @param: {mode} mode của dialog (thêm, sửa, xóa)
     * Author: AnhDV 02/10/2022
     * @example: this.$store.commit("setMode", "add");
     */
    setMode(state, mode) {
      state.mode = mode;
    },
    /**
     * @description: Thay đổi id của nhân viên
     * @param: {state} state của store
     * @param: {employeeId} id của nhân viên
     * Author: AnhDV 02/10/2022
     * @example: this.$store.commit("setEmployeeId", 1);
     */
    setEmployeeId(state, employeeId) {
      state.employeeId = employeeId;
    },
  },
  actions: {
    /**
     * @description: Thay đổi mode của dialog
     * @param: {context} context của store
     * @param: {mode} mode của dialog (thêm, sửa, xóa)
     * Author: AnhDV 02/10/2022
     * @example: this.$store.dispatch("setMode", "add");
     */
    setMode({ commit }, mode) {
      commit("setMode", mode);
    },
    /**
     * @description: Thay đổi id của nhân viên
     * @param: {context} context của store
     * @param: {employeeId} id của nhân viên
     * Author: AnhDV 02/10/2022
     * @example: this.$store.dispatch("setEmployeeId", 1);
     */
    setEmployeeId({ commit }, employeeId) {
      commit("setEmployeeId", employeeId);
    },
  },
  getters: {
    /**
     * @description: Lấy mode của dialog
     * @param: {state} state của store
     * Author: AnhDV 02/10/2022
     * @example: this.$store.getters.getMode;
     * @return: mode của dialog (thêm, sửa, xóa)
     * Author: AnhDV 02/10/2022
     */
    getMode(state) {
      return state.mode;
    },
    /**
     * @description: Lấy id của nhân viên
     * @param: {state} state của store
     * Author: AnhDV 02/10/2022
     * @example: this.$store.getters.getEmployeeId;
     * @return: id của nhân viên
     * Author: AnhDV 02/10/2022
     */
    getEmployeeId(state) {
      return state.employeeId;
    },
  },
};

export default dialogMode;
