// import React, { useState, useEffect } from "react";

// const ActiveWorkflows = () => {
//   const [workflows, setWorkflows] = useState([]);

//   const fetchWorkflows = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/engine-rest/process-instance");
//       const data = await response.json();
//       setWorkflows(data);
//     } catch (error) {
//       console.error("Error fetching workflows:", error);
//     }
//   };

//   const terminateWorkflow = async (id) => {
//     try {
//       await fetch(`http://localhost:8080/engine-rest/process-instance/${id}`, { method: "DELETE" });
//       alert("Workflow terminated successfully.");
//       fetchWorkflows(); // Refresh workflows
//     } catch (error) {
//       console.error("Error terminating workflow:", error);
//     }
//   };

//   useEffect(() => {
//     fetchWorkflows();
//   }, []);

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h3 className="text-2xl font-semibold mb-4">Active Workflows</h3>
//       <table className="min-w-full bg-gray-100">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Workflow ID</th>
//             <th className="px-4 py-2">Workflow Name</th>
//             <th className="px-4 py-2">Start Time</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {workflows.map((workflow) => (
//             <tr key={workflow.id}>
//               <td className="border px-4 py-2">{workflow.id}</td>
//               <td className="border px-4 py-2">{workflow.definitionId}</td>
//               <td className="border px-4 py-2">{workflow.startTime}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => terminateWorkflow(workflow.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Terminate
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ActiveWorkflows;
import React from "react";

const ActiveWorkflows = () => {
  // Static data for demonstration
  const workflows = [
    {
      id: "WF-12345",
      name: "Query Resolution Workflow",
      startTime: "2024-12-08T10:30:00",
      status: "Active",
      userQuery: "How do I update my address?",
    },
    {
      id: "WF-12346",
      name: "Manual Workflow",
      startTime: "2024-12-08T09:15:00",
      status: "Pending",
      userQuery: "I am unable to log in to my account.",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">Active Workflows</h3>
      <table className="min-w-full bg-gray-100 border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Workflow ID</th>
            <th className="px-4 py-2 border">Workflow Name</th>
            <th className="px-4 py-2 border">Start Time</th>
            <th className="px-4 py-2 border">User Query</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{workflow.id}</td>
              <td className="border px-4 py-2">{workflow.name}</td>
              <td className="border px-4 py-2">{new Date(workflow.startTime).toLocaleString()}</td>
              <td className="border px-4 py-2">{workflow.userQuery}</td>
              <td className="border px-4 py-2">{workflow.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveWorkflows;
