import { getQueriesApi } from "../../services/api";
import React, { useEffect } from "react";
const RecentActivity = () => {
    // Example Data (fetch from backend in a real app)
    let activities = [];
  
    useEffect(() => {
      // (async()=>{
      //   activities = await getQueriesApi()
      // })()
      console.log("sdfsdhss",localStorage.getItem("mockDatabase"))
    }, [])
    

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
  