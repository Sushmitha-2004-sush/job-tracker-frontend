import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://job-tracker-backend-9rv6.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public endpoints that don't need authentication
const publicEndpoints = ['/register/', '/token/', '/token/refresh/'];

// Add token to requests automatically
api.interceptors.request.use(
    (config) => {
    // Check if this is a public endpoint
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );

    // Only add token if NOT a public endpoint
    if (!isPublicEndpoint) {
      const token = localStorage.getItem('access_token');
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

export default api;
