import axios from "axios";

const isLocalDevelopment =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (isLocalDevelopment ? "http://127.0.0.1:5555" : "https://pangisha-smarthouse-c7ek.onrender.com"),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;