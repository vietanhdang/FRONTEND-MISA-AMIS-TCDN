import { createStore } from "vuex";
import dialogMode from "./dialogMode";
/**
 * @description: Tạo store lưu trữ các state
 * Author: AnhDV 24/09/2022
 */
const store = createStore({
  modules: {
    dialogMode,
  },
});

export default store;
