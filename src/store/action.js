/**
 * @description: Tạo store lưu trữ các action dùng chung của toàn bộ trang
 * Author: AnhDV 02/10/2022
 */
const action = {
  state: {
    actionKey: null, // key của action
  },
  mutations: {
    /**
     * @description: Thay đổi action thực hiện
     * Author: AnhDV 02/10/2022
     * @param {*} state
     * @param {*} action
     * @returns
     */
    setActionKey(state, action) {
      state.actionKey = action;
    },
  },
  getters: {
    /**
     * @description: Lấy action thực hiện
     * Author: AnhDV 02/10/2022
     * @param {*} state
     * @returns
     */
    getActionKey(state) {
      return state.actionKey;
    },
  },
};

export default action;
