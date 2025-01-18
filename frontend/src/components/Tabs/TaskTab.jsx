import React, { useState } from "react";

const Tasks = () => {
  // Static data for demonstration (initial task list)
  const [tasks, setTasks] = useState([
    {
      id: "TASK_001",
      name: "Review Address Update Request",
      workflowId: "WF-1",
      assignee: "Sanat",
      dueDate: "2024-12-15T17:40:00",
      status: "Pending",
    },
    {
      id: "TASK_002",
      name: "Resolve Login Issue",
      workflowId: "WF-2",
      assignee: "Kakadiya",
      dueDate: "2024-12-15T18:00:00",
      status: "In Progress",
    },
  ]);

  // Function to handle the "Mark as Complete" action
  const handleAction = (taskId) => {
    // Simulate a backend API call (/tasks/{taskId})
    setTimeout(() => {
      // Update the task list after marking the task as complete
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    }, 1000); // Simulate 1 second delay for the API call
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Pending Tasks
      </h3>
      <table className="min-w-full bg-gray-100 dark:bg-gray-700 border rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-600">
          <tr>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">
              Task ID
            </th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">
              Task Name
            </th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">
              Workflow ID
            </th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">
              Assignee
            </th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">
              Due Date
            </th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">
              Status
            </th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
              <td className="border px-4 py-2 text-gray-900 dark:text-white">{task.id}</td>
              <td className="border px-4 py-2 text-gray-900 dark:text-white">{task.name}</td>
              <td className="border px-4 py-2 text-gray-900 dark:text-white">{task.workflowId}</td>
              <td className="border px-4 py-2 text-gray-900 dark:text-white">{task.assignee}</td>
              <td className="border px-4 py-2 text-gray-900 dark:text-white">
                {new Date(task.dueDate).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                {task.status !== "Completed" ? (
                  <button
                    onClick={() => handleAction(task.id)}
                    className="px-4 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
                  >
                    Mark as Complete
                  </button>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
