// import React, { useState, useEffect } from "react";

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/engine-rest/task");
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const claimTask = async (taskId) => {
//     try {
//       await fetch(`http://localhost:8080/engine-rest/task/${taskId}/claim`, { method: "POST" });
//       alert("Task claimed successfully.");
//       fetchTasks();
//     } catch (error) {
//       console.error("Error claiming task:", error);
//     }
//   };

//   const completeTask = async (taskId) => {
//     try {
//       await fetch(`http://localhost:8080/engine-rest/task/${taskId}/complete`, { method: "POST" });
//       alert("Task completed successfully.");
//       fetchTasks();
//     } catch (error) {
//       console.error("Error completing task:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h3 className="text-2xl font-semibold mb-4">Pending Tasks</h3>
//       <table className="min-w-full bg-gray-100">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Task ID</th>
//             <th className="px-4 py-2">Task Name</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task.id}>
//               <td className="border px-4 py-2">{task.id}</td>
//               <td className="border px-4 py-2">{task.name}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => claimTask(task.id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Claim
//                 </button>
//                 <button
//                   onClick={() => completeTask(task.id)}
//                   className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                   Complete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Tasks;

import React from "react";

const Tasks = () => {
  // Static data for demonstration
  const tasks = [
    {
      id: "TASK-001",
      name: "Review Address Update Request",
      workflowId: "WF-12345",
      assignee: "Admin1",
      dueDate: "2024-12-09T17:00:00",
    },
    {
      id: "TASK-002",
      name: "Resolve Login Issue",
      workflowId: "WF-12346",
      assignee: "Admin2",
      dueDate: "2024-12-09T18:00:00",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">Pending Tasks</h3>
      <table className="min-w-full bg-gray-100 border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Task ID</th>
            <th className="px-4 py-2 border">Task Name</th>
            <th className="px-4 py-2 border">Workflow ID</th>
            <th className="px-4 py-2 border">Assignee</th>
            <th className="px-4 py-2 border">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{task.id}</td>
              <td className="border px-4 py-2">{task.name}</td>
              <td className="border px-4 py-2">{task.workflowId}</td>
              <td className="border px-4 py-2">{task.assignee}</td>
              <td className="border px-4 py-2">
                {new Date(task.dueDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
