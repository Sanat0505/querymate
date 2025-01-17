import axios from "axios";

// Configure Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3001", // Ensure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required to send cookies (like JWT token)
});

// Handle errors in API requests
const handleError = (error) => {
  if (error.response) {
    // Server responded with a non-2xx status
    console.error("API Error Response:", error.response.data);
    throw new Error(error.response.data.message || "Something went wrong");
  } else if (error.request) {
    // No response received
    console.error("API Error Request:", error.request);
    throw new Error("No response from server. Please check your network.");
  } else {
    // Other errors
    console.error("API Error:", error.message);
    throw new Error(error.message);
  }
};

// Sign-up API call
export const signUpApi = async (formData) => {
  try {
    const response = await apiClient.post("/querymate/auth/register", formData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Login API call
export const signinApi = async (formData, navigate) => {
  try {
    const response = await apiClient.post("/querymate/auth/login", formData);
    
    // Log only the relevant data (message and user)
    console.log("SignIn Response:", response.data);

    if (response.data) {
      // Optionally: store login info (for instance in localStorage or sessionStorage)
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("message", response.data.message);  // You can also store other messages if needed

      // If successful, redirect to dashboard (or other page)
      navigate("/dashboard");  // Assuming you're using react-router-dom and have a dashboard route set up
    } else {
      throw new Error("Login failed, no data returned.");
    }

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Query API call
export const submitQueryApi = async (query) => {
  try {
    const response = await apiClient.post("/querymate/queries/submitquery", query);
    console.log("Query Response:", response);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
