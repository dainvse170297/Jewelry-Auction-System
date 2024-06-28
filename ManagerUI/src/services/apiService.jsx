import axios from "../utils/axiosCustomize";

const getAllValuationRequests = async () => {
  return axios.get(`valuation/all`);
};

const postPreliminaryConfirm = async (
  id,
  estimateMin,
  estimateMax,
  staffId
) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("estimateMin", estimateMin);
  formData.append("estimateMax", estimateMax);
  formData.append("staffId", staffId);
  console.log("formData", id, estimateMin, estimateMax, staffId);

  return axios.post(`valuation/preliminary-valuation`, formData);
};

const postProductReceive = async (id) => {
  const formData = new FormData();
  formData.append("id", id);
  return axios.post(`valuation/product-received`, formData);
};

const getRevenueByYear = async (anYear) => {
  return axios.get(`dashboard/data/${anYear}`);
};

const getAllAuctionSession = async () => {
  return axios.get(`auction/all-session`);
};

const getAllCreatedSession = async () => {
  return axios.get(`auction/all-created-session`);
}

const publicCreatedSession = async (sessionId) => {
  return axios.post(`auction/public-session/${sessionId}`);

}

export {
  getAllValuationRequests,
  getRevenueByYear,
  postPreliminaryConfirm,
  postProductReceive,
  getAllAuctionSession,
  getAllCreatedSession,
  publicCreatedSession,
};
