import React, { useState } from 'react';
import { UsersIcon, ChartBarIcon, ClipboardListIcon, CogIcon, CalendarIcon, BookOpenIcon, InformationCircleIcon } from '@heroicons/react/solid';
import UserManagement from '../components/Tabs/UserManagement';
import Analytics from '../components/Tabs/Analytics';
import ActivityLogs from '../components/Tabs/ActivityLogs';
import Settings from '../components/Tabs/Settings';
import ActiveWorkflows from '../components/Tabs/ActiveWorkflows';
import Tasks from '../components/Tabs/TaskTab';
import DeployedWorkflows from '../components/Tabs/DeployedWorkflows';
import WorkflowCreator from '../components/Tabs/CreateWorkflow';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="container mx-auto p-4 lg:flex">
      {/* Sidebar */}
      <aside className="w-full h-auto lg:h-[95vh] lg:w-[20%] bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Admin Dashboard</h2>
        <ul>
        <li
            className={`flex items-center mb-4 ${
              activeTab === 'create' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('create')}
          >
            <InformationCircleIcon className="w-5 h-5 mr-2" />
            Create Workflows
          </li>
          <li
            className={`flex items-center mb-4 ${
              activeTab === 'user-management' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('user-management')}
          >
            <UsersIcon className="w-5 h-5 mr-2" />
            User Management
          </li>
          <li
            className={`flex items-center mb-4 ${
              activeTab === 'analytics' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('analytics')}
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Analytics
          </li>
          <li
            className={`flex items-center mb-4 ${
              activeTab === 'activity-logs' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('activity-logs')}
          >
            <ClipboardListIcon className="w-5 h-5 mr-2" />
            Activity Logs
          </li>
          <li
            className={`flex items-center mb-4 ${
              activeTab === 'active-workflows' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('active-workflows')}
          >
            <CalendarIcon className="w-5 h-5 mr-2" />
            Active Workflows
          </li>
          <li
            className={`flex items-center mb-4 ${
              activeTab === 'tasks' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('tasks')}
          >
            <BookOpenIcon className="w-5 h-5 mr-2" />
            Tasks
          </li>
          {/* <li
            className={`flex items-center mb-4 ${
              activeTab === 'create' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('create')}
          >
            <ClipboardListIcon className="w-5 h-5 mr-2" />
            Create Workflows
          </li> */}
          <li
            className={`flex items-center mb-4 ${
              activeTab === 'settings' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            } hover:text-primary-700 dark:hover:text-primary-200 cursor-pointer`}
            onClick={() => setActiveTab('settings')}
          >
            <CogIcon className="w-5 h-5 mr-2" />
            Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 lg:pl-8">
        <div className="flex justify-end mb-4 bg-primary-500 rounded-lg">
          <img
            src="https://via.placeholder.com/40"
            alt="Admin Profile"
            className="rounded-lg cursor-pointer"
          />
        </div>

        {activeTab === 'user-management' && <UserManagement />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'activity-logs' && <ActivityLogs />}
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'active-workflows' && <ActiveWorkflows />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'deployed' && <DeployedWorkflows />}
        {activeTab === 'create' && <WorkflowCreator />}
      </div>
    </div>
  );
};

export default AdminDashboard;
