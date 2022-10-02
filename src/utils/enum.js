/**
 * @description: Định nghĩa các Enum cho toàn bộ ứng dụng
 * Author: AnhDV 10/09/2022
 */
export default {
  // Mã phím
  KEY_CODE: {
    // Mã phím Enter
    ENTER: 13,
    // Mã phím Tab
    TAB: 9,
    // Mã phím Esc
    ESC: 27,
    // Mã phím Space
    SPACE: 32,
    // Mã phím Delete
    DELETE: 46,
    // Mã phím Backspace
    BACKSPACE: 8,
    // Mã phím Arrow Left
    ARROW_LEFT: 37,
    // Mã phím Arrow Up
    ARROW_UP: 38,
    // Mã phím Arrow Right
    ARROW_RIGHT: 39,
    // Mã phím Arrow Down
    ARROW_DOWN: 40,
    // Mã phím F1
    F1: 112,
    // Mã phím F2
    F2: 113,
    // Mã phím F3
    F3: 114,
    // Mã phím F4
    F4: 115,
    // Mã phím F5
    F5: 116,
    // Mã phím F6
    F6: 117,
    // Mã phím F7
    F7: 118,
    // Mã phím F8
    F8: 119,
    // Mã phím F9
    F9: 120,
    // Mã phím F10
    F10: 121,
    // Mã phím F11
    F11: 122,
    // Mã phím F12
    F12: 123,
  },
  // Mã trạng thái
  STATUS_CODE: {
    // Mã trạng thái thành công
    SUCCESS: 200,
    // Mã trạng thái lỗi
    ERROR: 500,
    // Mã trạng thái không tìm thấy
    NOT_FOUND: 404,
    // Mã trạng thái không có quyền
    UNAUTHORIZED: 401,
    // Mã trạng thái không có quyền
    FORBIDDEN: 403,
  },
  // Mã loại thông báo
  ALERT_TYPE: {
    // Thông báo thành công
    SUCCESS: "success",
    // Thông báo lỗi
    ERROR: "error",
    // Thông báo cảnh báo
    WARNING: "warning",
    // Thông báo thông tin
    INFO: "info",
  },
  // Filed Validation trong form
  FIELD_VALIDATION: {
    // Tên trường
    FIELD_NAME: "fieldName",
    // Mã lỗi
    ERROR_CODE: "errorCode",
    // Mô tả lỗi
    ERROR_MESSAGE: "errorMessage",
  },
  // Chi tiết lỗi
  ERROR_DETAIL: {
    // Mã lỗi
    ERROR_CODE: "errorCode",
    // Mô tả lỗi
    ERROR_MESSAGE: "errorMessage",
  },
  FORM_MODE: {
    // Chế độ thêm mới
    ADD: "add",
    // Chế độ chỉnh sửa
    EDIT: "edit",
  },
  // Thao tác
  ACTION: {
    // Thêm mới
    ADD: "add",
    // Chỉnh sửa
    EDIT: "edit",
    // Xóa
    DELETE: "delete",
    // Xem
    VIEW: "view",
    // Tìm kiếm
    SEARCH: "search",
    // Lưu
    SAVE: "save",
    // Hủy
    CANCEL: "cancel",
    // Đóng
    CLOSE: "close",
  },
};
