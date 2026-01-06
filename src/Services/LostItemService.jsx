import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";

axios.defaults.withCredentials = true;

// Generate new Lost Item ID
export const generateLostId = () => {
    return axios.get(`${BASE_URL}/lost-id`);
};

// Save Lost Item
export const saveLostItem = (lostItem) => {
    return axios.post(`${BASE_URL}/lost`, lostItem);
};

// Get Lost Items for Logged-in User
export const getLostItemsByUsername = () => {
    return axios.get(`${BASE_URL}/lost-user`);
};

// Get ALL Lost Items (Admin)
export const getAllLostItems = () => {
    return axios.get(`${BASE_URL}/lost`);
};
