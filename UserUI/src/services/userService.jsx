import axios from "../utils/axiosCustomize";

export { postLogin, postRegister };

const postLogin = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  return axios.post(`auth/token`, formData);
};

const postRegister = async (
  username,
  password,
  fullName,
  phone,
  email,
  address
) => {
  console.log(username, password, fullName, phone, email, address);
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("fullName", fullName);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("address", address);
  return axios.post(`account/member/register`, formData);
};
