import axios from "../utils/axiosCustomize";

const getAllValuationRequests = async () => {
  return axios.get(`valuation/all`);
};

const postLogin = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  return axios.post(`auth/token`, formData);
};

export { postLogin, getAllValuationRequests };
