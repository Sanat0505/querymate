import axios from "axios";

// Configure Axios instance for APIs calling

const apiClient = axios.create({
  baseURL: "http://localhost:3001", // Ensure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required to send cookies (we are using JWT token)
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
export const signInApi = async (formData) => {
  try {
    const response = await apiClient.post("/querymate/auth/login", formData);
    
    // Log only the relevant data (message and user)
    console.log("SignIn Response:", response.data);

    if (response.data) {
      // storing login information
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      throw new Error("Login failed, no data returned.");
    }

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Query API call
// export const submitQueryApi = async (query) => {
//   try {
//     const response = await apiClient.post("/querymate/queries/submitquery", query);
//     console.log("Query Response:", response);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };
let mockDatabase = [];
export const submitQueryApi = async (query) => {
  try {
    const newQuery = {
      id: mockDatabase.length + 1, // Auto-incrementing ID
      ...query,
      status: "Pending", // Default status for new queries
      createdAt: new Date().toISOString(), // Timestamp for the query
    };
    mockDatabase.push(newQuery); // Add to the in-memory database
    console.log("Query added:", newQuery);
    // localStorage.setItem("mockDatabase",JSON.parse(newQuery))
    return newQuery;
  } catch (error) {
    console.error("Error submitting query:", error.message);
    throw new Error("Failed to submit query.");
  }
};

export const getQueriesApi = async () => {
  try {
    console.log("Retrieving all queries:", mockDatabase);
    localStorage.setItem("mockDatabase",mockDatabase)
    return mockDatabase; // Return the in-memory database
  } catch (error) {
    console.error("Error retrieving queries:", error.message);
    throw new Error("Failed to retrieve queries.");
  }
};