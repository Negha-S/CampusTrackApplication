import axios from "axios";

/* ===========================
   BASE CONFIG
=========================== */
const BASE = "http://localhost:9595/lostfound";

/* ===========================
   AUTH ENDPOINTS
=========================== */
const AUTH = `${BASE}/auth`;
const LOGIN = `${AUTH}/login`;
const LOGOUT = `${AUTH}/logout`;
const REGISTER = `${AUTH}/register`;
const ROLE = `${AUTH}/role`;
const USER = `${AUTH}/user`;

/* ===========================
   ADMIN ENDPOINTS
=========================== */
const STUDENT = `${AUTH}/student`;          // GET all students
const DELETE_STUDENT = `${AUTH}/student`;   // DELETE /student/{username}

/* ===========================
   ITEM ENDPOINTS
=========================== */
const LOST_ITEMS = `${BASE}/lost`;           // GET all lost items
const FOUND_ITEMS = `${BASE}/found`;         // GET all found items

/* ===========================
   AUTH SERVICES
=========================== */

// Register new user
export const registerNewUser = (user) =>
  axios.post(REGISTER, user, { withCredentials: true });

// Login
export const loginUser = (username, password) =>
  axios.post(
    LOGIN,
    { username, password },
    { withCredentials: true }
  );

// Logout
export const logoutUser = () =>
  axios.post(LOGOUT, {}, { withCredentials: true });

// Get logged-in user's role
export const getRole = () =>
  axios.get(ROLE, { withCredentials: true });

// Get logged-in user details
export const getUserId = () =>
  axios.get(USER, { withCredentials: true });

/* ===========================
   ADMIN SERVICES
=========================== */

// Get all students (Admin)
export const getAllStudents = () =>
  axios.get(STUDENT, { withCredentials: true });

// Delete student by username (Admin)
export const deleteStudent = (username) =>
  axios.delete(`${DELETE_STUDENT}/${username}`, {
    withCredentials: true,
  });

/* ===========================
   LOST & FOUND SERVICES
=========================== */

// Get all lost items
export const getAllLostItems = () =>
  axios.get(LOST_ITEMS, { withCredentials: true });

// Get all found items
export const getAllFoundItems = () =>
  axios.get(FOUND_ITEMS, { withCredentials: true });
