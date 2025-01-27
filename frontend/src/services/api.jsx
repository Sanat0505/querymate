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



// Update User Profile API call 
export const updateUserApi = async (userData) => {
  try {
    // Retrieve the user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.name) {
      throw new Error("User name is missing from localStorage");
    }

    // Ensure userData contains the correct fields
    const { name, newName, email, password } = userData;

    // Construct the request data
    const requestData = {
      name: storedUser.name,  // Current name from localStorage
      newName: newName,       // New name (if provided)
      email: email,
      password: password,
    };

    // PUT request to update the user profile
    const response = await apiClient.put("/querymate/auth/update", requestData, {
      withCredentials: true,  // Send credentials if needed
    });

    console.log("Update Response:", response.data);  // Log the response for debugging
    return response.data;  // Return the updated user data
  } catch (error) {
    console.error("Error in updateUserApi:", error.message);
    handleError(error);  // Centralized error handling
  }
};


// Delete User API call 
export const deleteUserApi = async (name) => {
  try {
    if (!name) {
      throw new Error("User name is required to delete a user."); // Validation in case name is missing
    }

    // DELETE request to the backend
    const response = await apiClient.delete("/querymate/auth/delete", {
      data: { name }, // Pass name in the request body (as required by your backend)
    });

    console.log("Delete Response:", response.data); // Log success
    return response.data; // Return confirmation of deletion

  } catch (error) {
    console.error("Error in deleteUserApi:", error.message);
    handleError(error); // Centralized error handling
  }
};

// Get User API call 
export const getUserApi = async (name) => {
  try {
    if (!name) {
      throw new Error("User name is required to fetch user data."); // Validation in case name is missing
    }

    // POST request to fetch user data by name
    const response = await apiClient.post("/querymate/auth/", { name });

    console.log("Get User Response:", response.data); // Log the fetched user data
    return response.data; // Return the fetched user data

  } catch (error) {
    console.error("Error in getUserApi:", error.message);
    handleError(error); // Centralized error handling
  }
};

// Get All Users API call
export const getUsersApi = async () => {
  try {
    // GET request to fetch all users
    const response = await apiClient.get("/querymate/auth/users");
    console.log("Get Users Response:", response.data); // Log all users
    return response.data; // Return the list of users
  } catch (error) {
    console.error("Error in getUsersApi:", error.message);
    handleError(error); // Centralized error handling
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