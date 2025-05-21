import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/Auth/login`, {
    email,
    password,
  });

  return response.data; // AuthResponseDto
};

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/Auth/register`, {
    username,
    email,
    password,
  });

  return response.data; // AuthResponseDto
};
