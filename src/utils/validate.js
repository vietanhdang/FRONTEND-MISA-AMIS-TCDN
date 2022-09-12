/**
 * @description: Hàm này dùng để kiểm tra email có hợp lệ hay không
 * @param: {string} email - Email cần kiểm tra
 * @return: {boolean} - Trả về true nếu email hợp lệ, ngược lại trả về false
 * Author: AnhDV 11/09/2022
 */
export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
/**
 * @description: Hàm này dùng để kiểm tra số điện thoại có hợp lệ hay không
 * @param: {string} phone - Số điện thoại cần kiểm tra
 * @return: {boolean} - Trả về true nếu số điện thoại hợp lệ, ngược lại trả về false
 * Author: AnhDV 11/09/2022
 */
export function validatePhone(phone) {
  const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return re.test(String(phone));
}
