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
  publicCreatedSession,
  getAllCreatedSession,
  getAllAuctionSession,
  postSetAmountFinancialProof,
  getAllFinancialProof,
  getAllWinnerPurchasedAuctionRegister,
  getMemberByProductId,
  confirmTransfered,
  getValuationRequestById, //Get a valuation request by id
  getRejectValuationRequest,
  getAllProductReceivedRequest,
};

const getAllValuationRequests = async () => {
  return axios.get(`valuation/all`);
};

const getValuationRequestById = async (id) => {
  return axios.get(`valuation/valuation-request-detail/${id}`);
};

const getAllFinancialProof = async (status, page, size) => {
  const formData = new FormData();

  formData.append("status", status);
  formData.append("page", page);
  formData.append("size", size);
  console.log("formData", status, page, size);
  return axios.post(`/financial-proof/financial-proof-requests`, formData);
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

const postSetAmountFinancialProof = async (
  id,
  staffId,
  financialProofAmount,
  role
) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("staffId", staffId);
  formData.append("financialProofAmount", financialProofAmount);
  formData.append("role", role);
  console.log("formData", id, staffId, financialProofAmount, role);

  return axios.post(`/financial-proof/set-amount`, formData);
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
};

const publicCreatedSession = async (sessionId) => {
  return axios.post(`auction/public-session/${sessionId}`);
};

const getAllWinnerPurchasedAuctionRegister = async () => {
  return axios.get(`auction-register/get-purchased-auction-register`);
};

const getMemberByProductId = async (productId) => {
  return axios.get(`member/product/${productId}`);
};

const confirmTransfered = async (
  memberId,
  auctionRegisterId,
  transferAmount,
  photos
) => {
  const formData = new FormData();
  formData.append("memberId", memberId);
  formData.append("auctionRegisterID", auctionRegisterId);
  formData.append("transferAmount", transferAmount);
  photos.forEach((photo) => {
    formData.append("image", photo);
  });
  return axios.post(`seller-payment/save`, formData);
};

const getRejectValuationRequest = async (id) => {
  return axios.get(`valuation/staff-cancel/${id}`);
};

const getAllProductReceivedRequest = async () => {
  return axios.get(`valuation/request/status/product-received`);
};
