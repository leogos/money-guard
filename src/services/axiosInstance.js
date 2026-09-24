import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const persistedAuth = localStorage.getItem('persist:auth');

    if (persistedAuth) {
      const auth = JSON.parse(persistedAuth);
      const token = auth.token ? JSON.parse(auth.token) : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
