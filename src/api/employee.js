export default (axios) => ({
  getNewEmployeeCode() {
    return axios.get(
      process.env.VUE_APP_API_URL + "/Employees/NewEmployeeCode"
    );
  },

  getEmployeeById(id) {
    return axios.get(process.env.VUE_APP_API_URL + "/Employees/" + id);
  },
  getAllEmployees(object) {
    var defaultObject = {
      pageNumber: 1,
      pageSize: 10,
      search: "",
      sort: "",
    };
    object = Object.assign(defaultObject, object);
    var url = process.env.VUE_APP_API_URL + "/Employees/Filter";
    url += "?pageNumber=" + object.pageNumber;
    url += "&pageSize=" + object.pageSize;
    url += "&search=" + object.search;
    url += "&sort=" + object.sort;
    return axios.get(url);
  },
  deleteEmployee(id) {
    return axios.delete(process.env.VUE_APP_API_URL + "/Employees/" + id);
  },
  insertEmployee(object) {
    return axios.post(process.env.VUE_APP_API_URL + "/Employees", object);
  },
  updateEmployee(object) {
    return axios.put(
      process.env.VUE_APP_API_URL + "/Employees/" + object.employeeID,
      object
    );
  },
});
