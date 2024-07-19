import axios from "../utils/axiosCustomize";
export { postLogin, postCreateMemberAccount };

const postLogin = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  return axios.post(`auth/token`, formData);
};

const postCreateMemberAccount = async (
  username,
  password,
  fullName,
  email,
  phone,
  address
) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("fullName", fullName);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("address", address);
  return axios.post(`account/member/register`, formData);
};
