// src/api/auth.api.js
import api from "./axios"

// Register
export const registerUser = (data) => {
try {
  const res = api.post("/auth/register", data)
  return res
} catch (error) {
  console.log("Error : ", error)
}
}

// Login
export const loginUser = (data) => {
  return api.post("/auth/login", data)
}

// Get logged-in user
export const getMe = () => {
  return api.get("/auth/me")
}

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token")
}
