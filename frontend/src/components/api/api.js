import axios from "axios";

const api = axios.create({
  baseURL: ["http://localhost:8000/api", "https://vercel.com/meraj-1s-projects/focus-board"],
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
