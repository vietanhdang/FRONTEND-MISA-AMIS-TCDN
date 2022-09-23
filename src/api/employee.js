export default (axios) => ({
  getNewEmployeeCode() {
    return axios.get(
      process.env.VUE_APP_API_URL + "/employees/new-employee-code"
    );
  },

  getEmployeeById(id) {
    return axios.get(process.env.VUE_APP_API_URL + "/employees/" + id);
  },
  getEmployeesFilter(object) {
    var defaultObject = {
      pageNumber: 1,
      pageSize: 10,
      search: "",
      sort: "",
    };
    object = Object.assign(defaultObject, object);
    var url = process.env.VUE_APP_API_URL + "/employees/filter";
    url += "?pageNumber=" + object.pageNumber;
    url += "&pageSize=" + object.pageSize;
    url += "&search=" + object.search;
    url += "&sort=" + object.sort;
    return axios.get(url);
  },
  deleteEmployee(id) {
    return axios.delete(process.env.VUE_APP_API_URL + "/employees/" + id);
  },
  insertEmployee(object) {
    return axios.post(process.env.VUE_APP_API_URL + "/employees", object);
  },
  updateEmployee(object) {
    return axios.put(
      process.env.VUE_APP_API_URL + "/employees/" + object.employeeID,
      object
    );
  },
});
