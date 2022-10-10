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
    // Mã phím S
    S: 83,
    // Mã phím E
    E: 69,
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
  // Form mode
  FORM_MODE: {
    // Chế độ thêm mới
    ADD: "add",
    // Chế độ chỉnh sửa
    EDIT: "edit",
    // Chế độ Nhân bản
    DUPLICATE: "duplicate",
    // Null
    NULL: null,
  },
  // Hành động cất, hủy, xóa, nhân bản, lưu,...
  ACTION: {
    // Thêm mới
    ADD: "add",
    // Chỉnh sửa
    EDIT: "edit",
    // Xóa
    DELETE: "delete",
    // Xóa nhiều
    DELETE_MANY: "deleteMany",
    // Tìm kiếm
    SEARCH: "search",
    // Lưu
    SAVE: "save",
    // Cất và đóng form
    SAVE_AND_CLOSE: "saveAndClose",
    // Cất và thêm mới
    SAVE_AND_ADD: "saveAndAdd",
    // Hủy
    CANCEL: "cancel",
    // Đóng
    CLOSE: "close",
    // ngưng sử dụng
    INACTIVE: "inactive",
    // nhân bản
    DUPLICATE: "duplicate",
    // Reload dữ liệu
    RELOAD: "reload",
    // Xuất file
    EXPORT: "export",
    // Trợ giúp
    HELP: "help",
    // Null
    NULL: null,
  },
  // Các thông báo
  NOTICE_MESSAGE: {
    // Thông báo thêm mới thành công
    INSERT_SUCCESS: (data) => `Thêm mới nhân viên <b>${data}</b> thành công!`,
    // Thông báo thêm mới thất bại
    INSERT_ERROR: (data) => `Thêm mới nhân viên <b>${data}</b> thất bại!`,
    // Thông báo chỉnh sửa thành công
    EDIT_SUCCESS: (data) => `Chỉnh sửa nhân viên <b>${data}</b> thành công!`,
    // Thông báo chỉnh sửa thất bại
    EDIT_ERROR: (data) => `Chỉnh sửa nhân viên <b>${data}</b> thất bại!`,
    // Thông báo xóa thành công
    DELETE_SUCCESS: (data) => `Xóa nhân viên <b>${data}</b> thành công!`,
    // Thông báo xóa thất bại
    DELETE_ERROR: (data) => `Xóa nhân viên <b>${data}</b> thất bại!`,
    // Thông báo xóa nhiều thành công
    DELETE_MANY_SUCCESS: (data) => `Xóa <b>${data}</b> nhân viên thành công!`,
    // Thông báo xóa nhiều thất bại
    DELETE_MANY_ERROR: `Dữ liệu không tồn tại hoặc đã bị xóa trước đó.`,
    // Thông báo không tìm thấy dữ liệu
    NOT_FOUND: `Không tìm thấy dữ liệu!`,
    // Lỗi không xác định, vui lòng liên hệ quản trị viên
    UNKNOWN_ERROR: `Lỗi không xác định, vui lòng liên hệ quản trị viên!`,
    // Thông báo lỗi khi lấy danh sách nhân viên
    GET_EMPLOYEE_LIST_ERROR: `Có lỗi xảy ra khi lấy danh sách nhân viên!`,
    // Thông báo lỗi khi lấy thông tin nhân viên
    GET_EMPLOYEE_INFO_ERROR: `Có lỗi xảy ra khi lấy thông tin nhân viên!`,
    // Thông báo lỗi khi lấy danh sách phòng ban
    GET_DEPARTMENT_LIST_ERROR: `Có lỗi xảy ra khi lấy danh sách phòng ban!`,
    // Thông báo xuất danh sách nhân viên thành công
    EXPORT_EMPLOYEE_LIST_SUCCESS: `Xuất danh sách nhân viên thành công!`,
    // Thông báo xuất danh sách nhân viên thất bại
    EXPORT_EMPLOYEE_LIST_ERROR: `Xuất danh sách nhân viên thất bại!`,
    // Thông báo đang xử lý xuất danh sách nhân viên
    EXPORT_EMPLOYEE_LIST_PROCESSING: `Đang xử lý xuất danh sách nhân viên!`,
    // Thông báo tải lại dữ liệu thành công
    RELOAD_DATA_SUCCESS: `Tải lại dữ liệu thành công!`,
    // Thông báo tải lại dữ liệu thất bại
    RELOAD_DATA_ERROR: `Tải lại dữ liệu thất bại!`,
    // Thông báo tính năng đang được phát triển
    DEVELOPING: (data = "") => `Tính năng <b>${data}</b> đang được phát triển!`,
    // Cất và đóng form
    SAVE_AND_CLOSE: "Cất (Ctrl + S)",
    // Cất và thêm mới
    SAVE_AND_ADD: "Cất và thêm (Ctrl + Shift + S)",
  },
  // Các cảnh báo
  ALERT_MESSAGE: {
    DELETE_CONFIRM: (data) =>
      `Bạn có chắc chắn muốn xóa nhân viên <b>${data}</b> không?`,
    // Cảnh báo xóa nhiều
    DELETE_MANY_CONFIRM: `Bạn có thực sự muốn xóa những nhân viên đã chọn không?`,
    // Cảnh báo dữ liệu đã thay đổi
    DATA_CHANGED: `Dữ liệu đã bị thay đổi. Bạn có muốn cất không?`,
  },
  // Các thông báo lỗi của toast
  ICON: {
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
  },
  // Confirm
  CONFIRM: {
    YES: "Có",
    NO: "Không",
    CANCEL: "Hủy",
  },
  // Các thông báo lỗi input validation
  INPUT_VALIDATION: {
    REQUIRED: (data) => `${data} không được để trống!`,
    INVALID: (data) => `${data} không hợp lệ!`,
    INVALID_EMAIL: (data) => `${data} không hợp lệ!`,
    INVALID_PHONE_NUMBER: (data = "Số điện thoại") => `${data} không hợp lệ!`,
    INVALID_NUMBER: (data) => `${data} không hợp lệ!`,
    INVALID_MIN_LENGTH: (data, length) =>
      `${data} phải có ít nhất ${length} ký tự!`,
    INVALID_MAX_LENGTH: (data, length) =>
      `${data} không được vượt quá ${length} ký tự!`,
    INVALID_DATE: (data) => `${data} không hợp lệ!`,
    INVALID_DATE_OVER_CURRENT_DATE: (data) =>
      `${data} không được vượt quá ngày hiện tại!`,
  },
  // MISA CODE RESPONSE
  MISA_CODE: {
    // Thành công
    SUCCESS: 200,
    // Thêm mới thành công
    CREATED: 201,
    // Thêm mới thành công
    NO_CONTENT: 204,
    // Lỗi validate
    VALIDATE: 400,
    // Lỗi không xác định
    ERROR: 500,
  },
};
