import axios from "axios";
import { getItem } from "../utils/storage";
const API_BASE_URL = "http://192.168.10.8:3005/v1/user";  
// const API_BASE_URL = "https://qatarfollow.xyz/v1/user"; 


const api = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {

    const token = getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
