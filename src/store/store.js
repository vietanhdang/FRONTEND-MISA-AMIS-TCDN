import { createStore } from "vuex";
import dialogMode from "./dialogMode";
import employee from "./employee";
import action from "./action";

/**
 * @description: Tạo store lưu trữ các state
 * note: actions khác với mutations là actions hỗ trợ async/await và chỉ lên state bằng gọi mutations
 * Author: AnhDV 24/09/2022
 */
const store = createStore({
  modules: {
    dialogMode,
    employee,
    action,
  },
});

export default store;
