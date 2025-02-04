import axios from "axios";

// Configure Axios instance for APIs calling
const apiClient = axios.create({
  baseURL: "https://querymate-backend-new.vercel.app",
  // baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    // Add Authorization header if token exists
    Authorization: localStorage.getItem("token") 
      ? `Token ${localStorage.getItem("token")}` 
      : "",
  },
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
    console.log("response",response)
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Login API call
export const signInApi = async (formData) => {
  try {
    const response = await apiClient.post("/querymate/auth/login", formData);

    // Log the response data for debugging
    console.log("SignIn Response:", response.data);

    if (response.data) {
      const { token, user } = response.data;

      // Store token and user details separately in localStorage
      localStorage.setItem("token", token); // Save JWT token
      localStorage.setItem("user", JSON.stringify(user)); // Save user details

      console.log("Login successful. User and token stored in localStorage.");
    } else {
      throw new Error("Login failed. No data returned from server.");
    }

    return response.data; // Return the response data for further usage
  } catch (error) {
    // Improved error handling
    console.error("Error during login:", error.message || error);

    // Custom error message handling
    if (error.response?.data?.message) {
      console.error("Server Response:", error.response.data.message);
    }

    throw error; // Re-throw the error so it can be caught by the calling function
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
export const deleteUserApi = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not logged in");

    await apiClient.delete(`/querymate/auth/delete/${userId}`, {
      headers: { Authorization: `Token ${token}` },
    });
  } catch (error) {
    handleError(error);
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
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    const response = await apiClient.get("/querymate/auth/users", {
      headers: { Authorization: `Token ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
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
    const response = await apiClient.post("/querymate/queries/submitquery", 
      {queryText:`${query}`},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`, 
          // CustomHeader: "YourCustomHeaderValue",      // Example of adding a custom header
        },
      }
    );
    return response.data;
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

export const createWorkflowApi = async ({ bpmnXml, query, userData, name, cleanedJson }) => {
  try {
    if (!userData || !userData.id) {
      throw new Error("User data is missing!"); 
    }

    const response = await apiClient.post(
      "/querymate/workflows/create",
      {
        bpmnXml,
        userQuery: query,
        userEmail: userData.email,
        userId: userData.id, 
        name,
        parsedBpmn:cleanedJson,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting query:", error.response?.data || error.message);
    throw new Error("Failed to submit query.");
  }
};

export const getWorkflowsApi = async () => {
  try {
    const response = await apiClient.get("/querymate/workflows/workflows")
    // console.log("response",response)
    return response; // Return the in-memory database
  } catch (error) {
    console.error("Error retrieving workflows:", error.message);
    throw new Error("Failed to retrieve workflows.");
  }
};
export const getWorkflowApi = async (workflowId) => {
  try {
    const response = await apiClient.get(`/querymate/tasks/${workflowId}`)
    // console.log("response",response)
    return response; // Return the in-memory database
  } catch (error) {
    console.error("Error retrieving workflows:", error.message);
    throw new Error("Failed to retrieve workflows.");
  }
};

export const getTasksApi = async () => {
  try {
    const response = await apiClient.get("/querymate/tasks/")
    console.log("responseTasks",response)
    return response; 
  } catch (error) {
    console.error("Error retrieving tasks:", error.message);
    throw new Error("Failed to retrieve tasks.");
  }
};

export const updateTaskStatusApi = async (taskId,status) => {
  try {
    const response = await apiClient.put("/querymate/tasks/status", 
      {taskId:`${taskId}`,
    status:`${status}`},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`, 
          // CustomHeader: "YourCustomHeaderValue",      // Example of adding a custom header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting query:", error.message);
    throw new Error("Failed to submit query.");
  }
};