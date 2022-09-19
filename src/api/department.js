export default (axios) => ({
  getDepartments: () => axios.get(process.env.VUE_APP_API_URL + "/departments"),
});
