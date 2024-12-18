import React, { useState } from 'react';

const Settings = () => {
  // State for settings form
  const [profile, setProfile] = useState({
    name: 'Sanat Kakadiya',
    email: 'sanatkakdiya@gmial.com',
    password: '',
  });

  const [platformSettings, setPlatformSettings] = useState({
    appName: 'Querymate',
    theme: 'light', // or 'dark'
    maintenanceMode: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlatformSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    // Logic to save settings (e.g., API call)
    console.log('Profile Settings:', profile);
    console.log('Platform Settings:', platformSettings);
    alert('Settings Saved!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Settings</h3>

      {/* Profile Settings */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">Password</label>
            <input
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
            <label className="block text-gray-600 dark:text-gray-300 mb-2">Application Name</label>
            <input
              type="text"
              name="appName"
              value={platformSettings.appName}
              onChange={handlePlatformChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">Theme</label>
            <select
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
              type="checkbox"
              name="maintenanceMode"
              checked={platformSettings.maintenanceMode}
              onChange={handlePlatformChange}
              className="mr-2"
            />
            <label className="text-gray-600 dark:text-gray-300">Enable Maintenance Mode</label>
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

export default Settings;
