import axios from "axios";

// Configure Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3001/", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Sign-up API call
export const signUpApi = async (formData) => {
  const response = await apiClient.post("querymate/auth/register", formData);
  return response.data; 
};

// Login API call
export const signinApi = async (formData) => {
  const response = await apiClient.post("querymate/auth/login", formData);
  console.log("SignIn...",response)
    return response.data; 
  };
// Submit Query API call
export const submitQueryApi = async (query) => {
  const response = await apiClient.post("querymate/queries/submitquery", query);
  console.log("Query...",response)
    return response.data; 
  };
  