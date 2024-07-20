import axios from "../utils/axiosCustomize";

export {
  //Dashboard
  getRevenueByYear,
  getDataAccountByYear,

  //Valuation Request
  getAllValuationRequests,
  postPreliminaryConfirm,
  getFinalValuationRequests,
  postAproveFinalValuation,
  postSendFinalValuationToMember,
  postProductReceive,
  getValuationRequestById, //Get a valuation request by id (image of request)
  getRejectValuationRequest,
  getAllProductReceivedRequest,
  getProductDetailByRequestId, //Get product detail by request id (image of product)
  postCancelFinalValuation, //Cancel final valuation that has product information
  getFinalValuationRequestsDetail,

  //Financial Proof Request
  postSetAmountFinancialProof,
  getAllFinancialProof,
  postSentFinancialProof,
  publicCreatedSession,
  getAllCreatedSession,
  getAllAuctionSession,
  getAuctionSessionDetail,
  postConfirmVIPFinancialProof,

  //Auction session
  getAllWinnerPurchasedAuctionRegister,
  getMemberByProductId,
  confirmTransfered,
  getAllCategory,
  getListPurchasedLot,
  postConfirmDelivery,
  getAuctionSessionById,
  getAllDeliveredAuctionRegister,
  postUpdateSession,

  //Lot and product
  postAddProduct,
  getReadyLots,
  getReadyLotById,
  postAddLotToSession,
  postCreateSession,
  getDeliveredLots,
  getAllLots,
  getLotDetail,

  //Account
  getAllMemberAccounts,
  getAllStaffAccount,
  postCreateStaffAccount,
  postEditStaffAccount,
  getStaffAccountByStaffId,
  getLotsBySessionId,

  getAllSellerPayment,
  getMemberBySellerPaymentId,
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
  return axios.post(`financial-proof/financial-proof-requests`, formData);
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

  return axios.post(`financial-proof/set-amount`, formData);
};

const postProductReceive = async (id) => {
  const formData = new FormData();
  formData.append("id", id);
  return axios.post(`valuation/product-received`, formData);
};

const getFinalValuationRequests = async () => {
  return axios.get(`valuation/get-all-final-valuations`);
};

const postAproveFinalValuation = async (id) => {
  return axios.post(`valuation/approve-final-valuation/${id}`);
};

const postSendFinalValuationToMember = async (id) => {
  const param = new URLSearchParams();
  param.append("id", id);
  param.append("staffId", 1); //bo
  return axios.post(`valuation/send-final-valuation-to-member`, param);
};

const getRevenueByYear = async (anYear) => {
  return axios.get(`dashboard/dataRevenue/${anYear}`);
};

const getDataAccountByYear = async (anYear) => {
  return axios.get(`dashboard/dataAccount/${anYear}`);
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

const getAllDeliveredAuctionRegister = async () => {
  return axios.get(`auction-register/get-delivered-auction-register`);
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

const getProductDetailByRequestId = async (id) => {
  return axios.get(`valuation/view-final-request-details/${id}`);
};

const postCancelFinalValuation = async (id) => {
  return axios.post(`valuation/cancel-final-valuation/${id}`);
};
const getAllCategory = async () => {
  return axios.get(`category/all`);
};

const postAddProduct = async (product) => {
  const formData = new FormData();
  formData.append("valuationRequestId", product.valuationRequestId);
  formData.append("categoryId", product.categoryId);
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("estimatePriceMax", product.estimatePriceMax);
  formData.append("estimatePriceMin", product.estimatePriceMin);
  formData.append("buyNowPrice", product.buyNowPrice);
  formData.append("maxStep", product.maxStep);
  formData.append("pricePerStep", product.pricePerStep);
  formData.append("startPrice", product.startPrice);
  product.photos.forEach((photo, index) => {
    formData.append("photos", photo);
  });

  return axios.post("product/add-product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getReadyLots = async () => {
  return axios.get("lot/ready-lot");
};

const getReadyLotById = async (id) => {
  return axios.get(`lot/ready-lot/${id}`);
};

const postAddLotToSession = async (data) => {
  const formData = new FormData();
  formData.append("lotId", data.lotId);
  formData.append("sessionId", data.sessionId);
  return axios.post("auction/add-lot-to-session", formData);
};

const getAuctionSessionDetail = async (sessionId) => {
  return axios.get(`auction/session/${sessionId}`);
};

const getAllStaffAccount = async () => {
  return axios.get("staff/accounts");
};

const postCreateSession = async (auctionSession) => {
  const formData = new FormData();
  formData.append("staffId", auctionSession.staffId);
  formData.append("name", auctionSession.name);
  formData.append("description", auctionSession.description);
  formData.append("startTime", auctionSession.startTime);
  formData.append("endTime", auctionSession.endTime);
  formData.append("startingBid", auctionSession.startingBid);
  formData.append("image", auctionSession.image);

  return axios.post("auction/create-session", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const postUpdateSession = async (auctionSessionId, auctionSession) => {
  const formData = new FormData();
  formData.append("auctionSessionId", auctionSessionId);
  formData.append("staffId", auctionSession.staffId);
  formData.append("name", auctionSession.name);
  formData.append("description", auctionSession.description);
  formData.append("startTime", auctionSession.startTime);
  formData.append("endTime", auctionSession.endTime);
  formData.append("startingBid", auctionSession.startingBid);

  return axios.post("auction/update-session", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getFinalValuationRequestsDetail = async (id) => {
  return axios.get(`valuation/view-final-request-details/${id}`);
};

const getDeliveredLots = async () => {
  return axios.get("lot/view-list-delivered-lot");
};

const getListPurchasedLot = async () => {
  return await axios.get("lot/view-list-purchased-lot");
};

const postConfirmDelivery = async (purchased, confirm) => {
  const response = await axios.post(
    `/auction-register/confirm-product-delivery/${purchased.auctionRegistersId}?confirm=${confirm}`
  );
  return response;
};

const postSentFinancialProof = async (status, page, size) => {
  const formData = new FormData();
  formData.append("status", status);
  formData.append("page", page);
  formData.append("size", size);

  return await axios.post(
    "financial-proof/financial-proof-requests",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const postConfirmVIPFinancialProof = async (id, staffId, confirmValue) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("managerId", staffId);
  formData.append("confirm", confirmValue);

  return axios.post(`financial-proof/confirm-vip`, formData);
};

const getAuctionSessionById = async (id) => {
  return axios.get(`auction/session/${id}`);
};

const postCreateStaffAccount = async (staffAccount) => {
  const formData = new FormData();
  formData.append("username", staffAccount.username);
  formData.append("password", staffAccount.password);
  formData.append("fullName", staffAccount.fullName);

  return axios.post("account/staff/register", formData);
};

const getStaffAccountByStaffId = async (staffId) => {
  return axios.get(`staff/accounts/${staffId}`);
};

const postEditStaffAccount = async (newStaffAccount) => {
  const formData = new FormData();
  formData.append("staffId", newStaffAccount.id);
  formData.append("password", newStaffAccount.password);
  formData.append("fullName", newStaffAccount.fullName);
  return axios.post(`account/staff/update`, formData);
};

const getAllMemberAccounts = async () => {
  return axios.get(`member/get-all`);
};

const getLotsBySessionId = async (sessionId) => {
  return axios.get(`lot/get-lots-by-session/${sessionId}`);
};

const getAllSellerPayment = async () => {
  return axios.get(`seller-payment/all`);
}

const getMemberBySellerPaymentId = async (sellerPaymentId) => {
  return axios.get(`seller-payment/get-member/${sellerPaymentId}`);
}

const getAllLots = async () => {
  return axios.get(`lot/all-lots`);
}

const getLotDetail = async (lotId) => {
  return axios.get(`lot/${lotId}`);
}
