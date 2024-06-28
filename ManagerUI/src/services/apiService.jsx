import axios from "../utils/axiosCustomize";

export {
  getAllValuationRequests,
  getRevenueByYear,
  postPreliminaryConfirm,
  getFinalValuationRequests,
  getFinalValuationDetail,
  postAproveFinalValuation,
  postSendFinalValuationToMember,
  postProductReceive,
  getAllAuctionSession,
  getAllCreatedSession,
  publicCreatedSession,
};

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

const getFinalValuationRequests = async () => {
  return axios.get(`valuation/get-all-final-valuations`);
};

const getFinalValuationDetail = async (id) => {
  return axios.get(`valuation/view-final-request-details/${id}`);
};

const postAproveFinalValuation = async (id) => {
  return axios.post(`valuation/approve-final-valuation/${id}`);
};

const postSendFinalValuationToMember = async (id, staffId) => {
  const param = new URLSearchParams();
  param.append("id", id);
  param.append("staffId", staffId);
  return axios.post(`valuation/send-final-valuation-to-member`, param);
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
