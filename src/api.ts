import axios from "axios";
export const API_URL = "https://cocoa-expert-system.onrender.com";
// export const API_URL = "http://localhost:5000";

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


// const request = {
//   disease: "Damping-off",
//   growth_stage:"germination" | "seedling" | "nursery",
//   seedlings_exposed_to_sunlight : true | false",
//   soil_moisture: number,
//   soil_type: "sterilized" | "non-sterilized",
//   temperature: number,
// }
