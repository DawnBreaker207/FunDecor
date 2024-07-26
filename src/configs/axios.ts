import axios from 'axios';

const { VITE_BASE_API_URL } = import.meta.env;
const instance = axios.create({
  baseURL: VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
