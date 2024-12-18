const RecentActivity = () => {
    // Example Data (fetch from backend in a real app)
    const activities = [
      {
        id: 1,
        type: "query",
        content: "How can I reset my password?",
        status: "Resolved",
        date: "Dec 7, 12:30 PM",
      },
      {
        id: 2,
        type: "profile",
        content: "Email changed to newemail@example.com",
        status: null,
        date: "Dec 6, 11:00 AM",
      },
      {
        id: 3,
        type: "support",
        content: "Contacted support for issue with account access",
        status: "Pending",
        date: "Dec 5, 9:45 AM",
      },
    ];
  
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                <p className="text-gray-800 dark:text-white">
                  <strong>{activity.type === "query" ? "Query" : "Profile Update"}:</strong>{" "}
                  {activity.content}
                </p>
                {activity.status && (
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Status:</strong> {activity.status}
                  </p>
                )}
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  <strong>Date:</strong> {activity.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecentActivity;
  