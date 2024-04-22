// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: 'http://localhost:3000', // Your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
    // Other default headers if needed
  }
});

// Interceptor to add Authorization header with token for authenticated requests
instance.interceptors.request.use(
  async (config) => {
    // Check if the request is not for login and token exists in local storage
    if (config.url !== '/auth/login-with-email') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
