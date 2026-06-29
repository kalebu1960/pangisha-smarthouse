import api from "./axios";

export async function loginUser(credentials) {
  const response = await api.post("/login", credentials);
  return response.data;
}

export async function registerUser(userData) {
  const response = await api.post("/register", userData);
  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/me");
  return response.data;
}