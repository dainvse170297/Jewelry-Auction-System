import axios from "../utils/axiosCustomize";

export {
  postCreateValuation,
  getUpcomingSessionList,
  postUpcomingSessionDetail,
  getCheckLotRegister,
  getUpcomingLotDetail,
  getLiveAuctionSessionList,
  postLiveAuctionSessionDetail,
  getPastSessionList,
  postPastSessionDetail,
  getLiveLotDetail,
  getBidHistory,
  postPlaceBidding,
  postPrePlaceBid,
  getAllCheckOutProducts,
  getCheckOut,
  getPaymentCallback,
  postCreateFinancialProofAmount,
  getProfileDetail,
  getSentValuationRequest,
  getValuationRepsonse,
  getAuctionRegisterHistory,
  getFinancialProof,
  postAddCreditCard,
  putEditCreditCard,
  deleteCreditCard,
  postNotifications,
  getReadNotify,
  postConfirmFinalValuation,
  getAllUpcomingSession,
};

const postCreateValuation = async (valuation) => {
  const formData = new FormData();
  formData.append("memberId", valuation.memberId);
  formData.append("description", valuation.description);
  formData.append("memberEstimatePrice", valuation.memberEstimate);

  valuation.photos.forEach((photo, index) => {
    formData.append("image", photo);
  });

  return axios.post(`valuation/create`, formData);
};

const getUpcomingSessionList = async () => {
  return axios.get(`auction/session/upcoming`);
};

const postUpcomingSessionDetail = async (memberId, sessionId) => {
  const params = new URLSearchParams();
  params.append("memberId", memberId);
  params.append("sessionId", sessionId);
  return axios.post(`auction/session/upcoming/details`, params);
};

const getUpcomingLotDetail = async (lotId) => {
  return axios.get(`lot/view-upcoming-lot-detail/${lotId}`);
};

const getCheckLotRegister = async (memberId, lotId) => {
  return axios.get(
    `auction-register/check-member-register/${memberId}/${lotId}`
  );
};

const getLiveAuctionSessionList = async () => {
  return axios.get(`auction/session/live`);
};

const postLiveAuctionSessionDetail = async (sessionId, memberId) => {
  const formData = new FormData();
  formData.append("sessionId", sessionId);
  formData.append("memberId", memberId);
  return axios.post(
    `auction/session/view-live-auction-session-detail`,
    formData
  );
};

const getPastSessionList = async () => {
  return axios.get(`auction/session/past`);
};

const postPastSessionDetail = async (sessionId) => {
  const formData = new FormData();
  formData.append("sessionId", sessionId);
  return axios.post(`auction/session/past/details`, formData);
};
const getLiveLotDetail = async (lotId) => {
  return axios.get(`lot/view-live-lot-detail/${lotId}`);
};

const getBidHistory = async (lotId) => {
  return axios.get(`bid/list-bid?lotId=${lotId}`);
};

const postPlaceBidding = async (price, lotId, memberId) => {
  const formData = new FormData();
  formData.append("price", price);
  formData.append("lotId", lotId);
  formData.append("memberId", memberId);

  return axios.post(`bid/place-bid`, formData);
};

const postPrePlaceBid = async (memberId, lotId, price) => {
  return axios.post(`auction-register/place-to-bid`, null, {
    params: {
      memberId: memberId,
      lotId: lotId,
      price: price || 0,
    },
  });
};

const getAllCheckOutProducts = async (memberId) => {
  return axios.get(`auction-register/view-win-auction-list/${memberId}`);
};

const getCheckOut = async (bankCode, amount) => {
  return axios.get(`api/payment/vnpay`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      amount: amount,
      bankCode: bankCode,
    },
  });
};

const getPaymentCallback = async (vnp_ResponseCode, auctionRegisterIds) => {
  return axios.get("api/payment/callback", {
    params: {
      vnp_ResponseCode,
      auctionRegisterIds,
    },
  });
};

const postCreateFinancialProofAmount = async (valuation) => {
  const formData = new FormData();
  formData.append("memberId", valuation.memberId);
  valuation.photos?.forEach((photo) => {
    formData.append("image", photo);
  });

  return axios.post(`financial-proof/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getProfileDetail = async (memberId) => {
  return axios.get(`member/profile/${memberId}`);
};

const getSentValuationRequest = async (id) => {
  return axios.get(`valuation/view-sent-request/${id}`);
};

const getValuationRepsonse = async (id) => {
  return axios.get(`response/view-valuation-response/${id}`);
};

const getAuctionRegisterHistory = async (id) => {
  return axios.get(`auction-register/get-auction-register-by-memberId/${id}`);
};

const getFinancialProof = async (id) => {
  return axios.get(`member/financial-proof/${id}`);
};

const postAddCreditCard = async (memberId, newCreditCard) => {
  return await axios.post(
    `/member/profile/${memberId}/add-credit-card`,
    newCreditCard
  );
};
const putEditCreditCard = async (memberId, updatedCreditCard) => {
  return await axios.put(
    `/member/profile/${memberId}/edit-credit-card`,
    updatedCreditCard
  );
};
const deleteCreditCard = async (memberId) => {
  return axios.delete(`/member/profile/${memberId}/delete-credit-card`);
};
const postNotifications = async (memberId) => {
  return axios.get(`notify/member/${memberId}`);
};

const getReadNotify = async (notifyId) => {
  return axios.get(`notify/read/${notifyId}`);
};

const postConfirmFinalValuation = async (id, confirmValue) => {
  const params = new URLSearchParams();
  params.append("id", id);
  params.append("status", confirmValue);
  return axios.post(`response/confirm-final-valuation-by-member`, params);
};

const getAllUpcomingSession = async () => {
  return axios.get("auction/session/upcoming")
}
