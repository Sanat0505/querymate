import React, { useState } from "react";
import { signinApi } from "../services/api";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");  // For error or success messages
  const [isLoading, setIsLoading] = useState(false);  // To track loading state
  const navigate = useNavigate();  // Use useNavigate hook

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Set loading state to true

    try {
      // Call signin API with formData and navigate as arguments
      const response = await signinApi(formData, navigate);
      
      // If response is successful, clear form and set success message
      setFormData({ email: "", password: "" });
      setMessage("Welcome back! You are logged in.");
      
    } catch (error) {
      // If an error occurs, display the error message
      setMessage(`Error: ${error.message || "Login failed. Please try again."}`);
    } finally {
      setIsLoading(false);  // Set loading state back to false
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your email"
          className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
        disabled={isLoading}  // Disable button while loading
      >
        {isLoading ? "Signing In..." : "Sign In"}  {/* Show loading text while processing */}
      </button>

      {/* Display message */}
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </form>
  );
};

export default SignIn;
