import axios from "../utils/axiosCustomize";

export {
  postCreateValuation,
  getUpcomingSessionList,
  postUpcomingSessionDetail,
  getCheckLotRegister,
  getUpcomingLotDetail,
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
