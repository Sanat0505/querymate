import React, { useState, useEffect } from "react";
import { updateUserApi } from "../../services/api"; 
const ProfileSettingsTab = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [platformSettings, setPlatformSettings] = useState({
    appName: "Querymate",
    theme: "light", // or 'dark'
    maintenanceMode: false,
  });

  useEffect(() => {
    try {
      // Check if userData exists in localStorage (this happens after sign-up as well)
      const userData = localStorage.getItem("user");

      // Proceed only if userData exists
      if (userData) {
        const parsedUser = JSON.parse(userData); // Try to parse the user data
        if (parsedUser && parsedUser.name && parsedUser.email) {
          setProfile({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            password: "", // Keep password empty for security reasons
          });
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Handle the case where the stored user data is invalid JSON
      alert("There was an issue loading your profile. Please log in again.");
    }
  }, []); // Runs only once when the component is mounted

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlatformSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSettings = async () => {
    // Validation for required fields
    if (!profile.name || !profile.email) {
      alert("Name and email are required.");
      return;
    }

    try {
      // Get the user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.name) {
        alert("User is not logged in or missing name.");
        return;
      }

      // Call the API to update user data
      const response = await updateUserApi({
        name: profile.name, // Send the updated name
        email: profile.email, // Send the updated email
        password: profile.password, // Send the updated password if changed
      });

      console.log("Update successful:", response);

      // Save the updated user data back to localStorage
      localStorage.setItem("user", JSON.stringify({
        ...userData,  // Retain other user data
        name: profile.name,
        email: profile.email,
      }));

      // Clear password field after saving
      setProfile((prev) => ({ ...prev, password: "" }));

      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update settings. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Settings</h3>

      {/* Profile Settings */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h4>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* Platform Settings */}
      <section>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Settings</h4>
        <div className="space-y-4">
          <div>
            <label htmlFor="appName" className="block text-gray-600 dark:text-gray-300 mb-2">
              Application Name
            </label>
            <input
              id="appName"
              type="text"
              name="appName"
              value={platformSettings.appName}
              onChange={handlePlatformChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="theme" className="block text-gray-600 dark:text-gray-300 mb-2">
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={platformSettings.theme}
              onChange={handlePlatformChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="maintenanceMode"
              type="checkbox"
              name="maintenanceMode"
              checked={platformSettings.maintenanceMode}
              onChange={handlePlatformChange}
              className="mr-2"
            />
            <label htmlFor="maintenanceMode" className="text-gray-600 dark:text-gray-300">
              Enable Maintenance Mode
            </label>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSaveSettings}
          className="bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 px-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ProfileSettingsTab;
