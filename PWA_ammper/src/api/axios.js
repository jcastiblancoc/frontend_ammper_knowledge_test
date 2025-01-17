import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8001', // Cambia esta URL si tu backend está en otro lugar
    headers: {
    'Content-Type': 'application/json',
    },
});

export default axiosInstance;
