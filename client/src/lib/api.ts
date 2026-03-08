import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
});

API.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    console.log(process.env.EXPO_PUBLIC_BACKEND_URL);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
let didReset = false;
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !didReset) {
      didReset = true;
      useAuthStore.getState().reset();
      setTimeout(() => (didReset = false), 500);
    }
    return Promise.reject(error);
  },
);

export default API;
