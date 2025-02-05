import React, { useState, useEffect } from 'react';
import { HomeIcon, UserCircleIcon, SupportIcon, DocumentAddIcon } from '@heroicons/react/solid';
import RecentActivityTab from '../components/Tabs/RecentActivityTab';
import ProfileSettingsTab from '../components/Tabs/ProfileSettingsTab';
import SupportTab from '../components/Tabs/SupportTab';
import SubmitQueryTab from '../components/Tabs/SubmitQueryTab';
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('submit-query');
  const [userData, setUserData] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Decode JWT token and set user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("authToken"); // Clear token
    localStorage.removeItem("user"); // Clear user data
    window.location.href = "/"; // Redirect to home
  };

  return (
    <div className="container mx-auto p-4 lg:flex">
      <aside className="w-full h-auto lg:h-[95vh] lg:w-[20%] bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">User Dashboard</h2>
        <ul>
          <li className={`flex items-center mb-4 ${activeTab === 'submit-query' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('submit-query')}>
            <HomeIcon className="w-5 h-5 mr-2" />
            Ask Question
          </li>
          <li className={`flex items-center mb-4 ${activeTab === 'recent-activity' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('recent-activity')}>
            <DocumentAddIcon className="w-5 h-5 mr-2" />
            History
          </li>
          <li className={`flex items-center mb-4 ${activeTab === 'profile-settings' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('profile-settings')}>
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Profile Settings
          </li>
          <li className={`flex items-center mb-4 ${activeTab === 'support' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('support')}>
            <SupportIcon className="w-5 h-5 mr-2" />
            Support
          </li>
        </ul>
      </aside>

      <div className="w-full lg:w-3/4 lg:pl-8">
        <div className="flex justify-end mb-4 relative usericon">
          {/* User Icon */}
          <div className="relative w-full bg-primary-500 text-white p-2 rounded-lg text-2xl hover:cursor-pointer shadow-lg hover:bg-primary-600 transition" >
            <div 
              className="flex justify-end"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUser />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-2 transform transition-all duration-200 scale-95 origin-top-right">
                {/* User Info */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-white font-semibold">{userData?.name || "User"}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{userData?.email || "email@example.com"}</p>
                </div>

                {/* Menu Items */}
                <button 
                  className="w-full text-left px-4 py-3 flex items-center gap-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  onClick={() => setActiveTab('profile-settings')}
                >
                  <UserCircleIcon className="w-5 h-5" />
                  Profile
                </button>
                <button 
                  className="w-full text-left px-4 py-3 flex items-center gap-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  onClick={handleLogout}
                >
                  <SupportIcon className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'recent-activity' && <RecentActivityTab userData={userData} />}
        {activeTab === 'profile-settings' && <ProfileSettingsTab userData={userData} />}
        {activeTab === 'support' && <SupportTab />}
        {activeTab === 'submit-query' && <SubmitQueryTab userData={userData} />}
      </div>
    </div>
  );
};

export default UserDashboard;
