import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";

axios.defaults.withCredentials = true;

// Generate new Found Item ID
export const generateFoundId = () => {
    return axios.get(`${BASE_URL}/found-id`);
};

// Save Found Item
export const saveFoundItem = (foundItem) => {
    return axios.post(`${BASE_URL}/found`, foundItem);
};

// Get Found Items for Logged-in User
export const getFoundItemsByUsername = () => {
    return axios.get(`${BASE_URL}/found-user`);
};

// Get ALL Found Items (Admin)
export const getAllFoundItems = () => {
    return axios.get(`${BASE_URL}/found`);
};

// ✅ NEW: Get Found Items by Lost Item ID
export const getFoundItemByLostItem = (lostItemId) => {
    return axios.get(`${BASE_URL}/found-id/${lostItemId}`);
};
