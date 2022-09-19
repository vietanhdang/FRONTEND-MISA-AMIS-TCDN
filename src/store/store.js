import { createStore } from "vuex";
export const store = createStore({
  state: {
    count: 0,
  },
  getters: {
    double: (state) => {
      return state.count * 2;
    },
  },
  mutations: {
    increment: (state) => {
      state.count++;
    },
  },
});
