import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";

export const getMatchingFoundItems = (lostItemId) => {
  return axios.get(`${BASE_URL}/found-id/${lostItemId}`, {
    withCredentials: true
  });
};

export const collectItem = (lostItemId, foundItemId) => {
  return axios.post(`${BASE_URL}/match`, {
    lostItemId,
    foundItemId
  }, {
    withCredentials: true
  });
};
