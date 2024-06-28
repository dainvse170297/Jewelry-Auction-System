import axios from "../utils/axiosCustomize";

const getAllValuationRequests = async () => {
  return axios.get(`valuation/all`);
};

const getAllFinancialProof = async () => {
  return axios.get(`/financial-proof/get-all`);
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
  financialProofAmount
) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("staffId", staffId);
  formData.append("financialProofAmount", financialProofAmount);
  console.log("formData", id, staffId, financialProofAmount);

  return axios.post(`/financial-proof/set-amount`, formData);
};

const postProductReceive = async (id) => {
  const formData = new FormData();
  formData.append("id", id);
  return axios.post(`valuation/product-received`, formData);
};

const getRevenueByYear = async (anYear) => {
  return axios.get(`dashboard/data/${anYear}`);
};

export {
  getAllValuationRequests,
  getRevenueByYear,
  postPreliminaryConfirm,
  postProductReceive,
  getAllFinancialProof,
  postSetAmountFinancialProof,
};
