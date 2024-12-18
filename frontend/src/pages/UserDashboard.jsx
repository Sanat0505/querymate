import React, { useState } from 'react';
import { HomeIcon, UserCircleIcon, SupportIcon, DocumentAddIcon } from '@heroicons/react/solid';
import RecentActivityTab from '../components/Tabs/RecentActivityTab';
import ProfileSettingsTab from '../components/Tabs/ProfileSettingsTab';
import SupportTab from '../components/Tabs/SupportTab';
import SubmitQueryTab from '../components/Tabs/SubmitQueryTab';


const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('submit-query');

  return (
    <div className="container mx-auto p-4 lg:flex">
      <aside className="w-full h-auto lg:h-[95vh] lg:w-[20%] bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">User Dashboard</h2>
        <ul>
          <li
            className={`flex items-center mb-4 ${activeTab === 'submit-query' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('submit-query')}
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Ask Question
          </li>
          <li
            className={`flex items-center mb-4 ${activeTab === 'recent-activity' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('recent-activity')}
          >
            <DocumentAddIcon className="w-5 h-5 mr-2" />
            History
          </li>
          <li
            className={`flex items-center mb-4 ${activeTab === 'profile-settings' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('profile-settings')}
          >
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Profile Settings
          </li>
          <li
            className={`flex items-center mb-4 ${activeTab === 'support' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('support')}
          >
            <SupportIcon className="w-5 h-5 mr-2" />
            Support
          </li>
        </ul>
      </aside>

      <div className="w-full lg:w-3/4 lg:pl-8">
        <div className="flex justify-end mb-4 bg-primary-500 rounded-lg">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-lg cursor-pointer"
          />
        </div>

        {activeTab === 'recent-activity' && <RecentActivityTab />}
        {activeTab === 'profile-settings' && <ProfileSettingsTab />}
        {activeTab === 'support' && <SupportTab />}
        {activeTab === 'submit-query' && <SubmitQueryTab />}
      </div>
    </div>
  );
};

export default UserDashboard;
