// src/utils/api.js
// Centralized API configuration

// Temporary hard-coded production URL (remove fallback once env var works)
const API_BASE_URL = 'https://fuzzads-backend-4.onrender.com';

// For local development you can switch to this (comment/uncomment as needed)
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
//   || import.meta.env.VITE_API_URL 
//   || 'http://localhost:5000';

console.log('[API Config] Using base URL:', API_BASE_URL);

export default API_BASE_URL;
