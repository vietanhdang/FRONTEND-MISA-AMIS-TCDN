/* eslint-disable */
/**
 * @description: Hàm này dùng để format ngày giờ từ dạng timestamp sang dạng dd/mm/yyyy
 * @param: {number} timestamp - Thời gian dạng timestamp
 * @return: {string} - Thời gian dạng dd/mm/yyyy
 * Author: AnhDV 10/09/2022
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * @description: Hàm này dùng để format số thập phân về dạng số nguyên
 * @param: {number} number - Số thập phân
 * @return: {number} - Số nguyên
 * Author: AnhDV 11/09/2022
 */
export function formatNumber(number) {
  return Math.round(number);
}

/**
 * @description Hàm này dùng để chuẩn hóa các kí tự tiếng việt trong chuỗi văn bản thành kí tự không dấu
 * @param {string} text Chuỗi văn bản cần chuẩn hóa
 * @return {string} - Chuỗi văn bản sau khi chuẩn hóa
 * Author: AnhDV 10/09/2022
 */
export function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D"); // Chuyển các kí tự có dấu thành không dấu

  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư

  str = str.replace(/ + /g, " "); // Loại bỏ khoảng trắng thừa
  str = str.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi

  // Remove punctuations
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  ); // Loại bỏ các kí tự đặt biệt
  return str;
}

/**
 * @description: Hàm này dùng để convert giới tính từ số sang chuỗi
 * @param: number - Giới tính dạng số
 * @return: string - Giới tính dạng chuỗi
 * Author: AnhDV 12/09/2022
 */
export function convertGender(number) {
  if (number === 0) {
    return this.$t("employee_info.male");
  } else if (number === 1) {
    return this.$t("employee_info.female");
  } else {
    return this.$t("employee_info.other");
  }
}
export default {
  formatDate,
  formatNumber,
  removeVietnameseTones,
  convertGender,
};
