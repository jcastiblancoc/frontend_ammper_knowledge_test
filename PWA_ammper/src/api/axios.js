import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.226.202.146:8000', // Cambia esta URL si tu backend está en otro lugar
    headers: {
    'Content-Type': 'application/json',
    },
});

export default axiosInstance;
