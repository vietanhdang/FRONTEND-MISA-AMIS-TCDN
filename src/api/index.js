import department from "./department";
import employee from "./employee";
import axios from "axios";
const api = {
  department: department(axios),
  employee: employee(axios),
};

export default api;
