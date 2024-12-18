import React from 'react';

const ActivityLogs = () => {
  // Example data for activity logs
  const logs = [
    {
      id: 1,
      timestamp: '2024-12-07 14:30:00',
      user: 'John Doe',
      action: 'Deleted user #123',
      details: 'IP: 192.168.1.1',
    },
    {
      id: 2,
      timestamp: '2024-12-07 13:45:00',
      user: 'Jane Smith',
      action: 'Updated site settings',
      details: 'IP: 192.168.1.2',
    },
    {
      id: 3,
      timestamp: '2024-12-07 12:20:00',
      user: 'Admin Bot',
      action: 'Added a new user #456',
      details: 'IP: 192.168.1.3',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Activity Logs</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left text-gray-600 dark:text-gray-300">Timestamp</th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left text-gray-600 dark:text-gray-300">User</th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left text-gray-600 dark:text-gray-300">Action</th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left text-gray-600 dark:text-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">{log.timestamp}</td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">{log.user}</td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">{log.action}</td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;
