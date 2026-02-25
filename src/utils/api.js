// src/utils/api.js
import axios from 'axios';

// Define the base URL (switch to localhost when needed)
const API_BASE_URL = 'https://fuzzads-backend-4.onrender.com';
// const API_BASE_URL = 'http://localhost:5000'; 

console.log('[API Config] Using base URL:', API_BASE_URL);

// Create a custom Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to automatically inject the auth token into every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default api;
