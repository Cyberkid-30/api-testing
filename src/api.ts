import axios from "axios";


export const API_URL = "https://cocoa-expert-system.onrender.com";

export const signup = async (username: String, password: String) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    username,
    password,
  });
  return response.data;
};

export const login = async (username: String, password: String) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};
