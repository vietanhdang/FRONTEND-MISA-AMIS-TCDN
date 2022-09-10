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


