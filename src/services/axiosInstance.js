import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'BURAYA_BACKEND_ADRESI',
});

export default axiosInstance;