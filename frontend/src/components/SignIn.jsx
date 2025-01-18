import React, { useState } from "react";
import { signinApi } from "../services/api";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
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
    try {
      const response = await signinApi(formData, navigate);  // Pass navigate here
      setMessage("Welcome back");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
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
      >
        Sign In
      </button>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </form>
  );
};

export default SignIn;
