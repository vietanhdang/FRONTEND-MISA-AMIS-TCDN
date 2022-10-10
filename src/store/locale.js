/**
 * @description: Tạo store lưu trữ locale dùng chung của toàn bộ trang
 * Author: AnhDV 02/10/2022
 */
import i18n from "@/locales/i18n";
const locale = {
  mutations: {
    /**
     * @description: Thay đổi locale
     * Author: AnhDV 02/10/2022
     */
    changeLocale(state, locale) {
      i18n.global.locale = locale;
    },
  },
  actions: {
    /**
     * @description: Thay đổi locale
     * Author: AnhDV 02/10/2022
     */
    changeLocale({ commit }, locale) {
      commit("changeLocale", locale);
    },
  },
};

export default locale;
