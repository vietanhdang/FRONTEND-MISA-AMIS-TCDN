/**
 * @description: Hàm này dùng để xem giá trị có null hay không
 * Author: AnhDV 27/09/2022
 */
export function isNullOrEmpty(value, undefinedValue = false) {
  if (undefinedValue) {
    return value === null || value === undefined || value === "";
  }
  return value === null || value === "";
}
