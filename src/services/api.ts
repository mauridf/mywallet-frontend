import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7006/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("mywallet_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
