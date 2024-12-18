import React, { useState, useEffect } from "react";

const DeployedWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);

  const fetchWorkflows = async () => {
    try {
      const response = await fetch("http://localhost:8080/engine-rest/deployment");
      const data = await response.json();
      setWorkflows(data);
    } catch (error) {
      console.error("Error fetching workflows:", error);
    }
  };

  const uploadWorkflow = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch("http://localhost:8080/engine-rest/deployment/create", {
        method: "POST",
        body: formData,
      });
      alert("Workflow uploaded successfully.");
      fetchWorkflows();
    } catch (error) {
      console.error("Error uploading workflow:", error);
    }
  };

  const deleteWorkflow = async (id) => {
    try {
      await fetch(`http://localhost:8080/engine-rest/deployment/${id}`, { method: "DELETE" });
      alert("Workflow deleted successfully.");
      fetchWorkflows();
    } catch (error) {
      console.error("Error deleting workflow:", error);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">Deployed Workflows</h3>
      <table className="min-w-full bg-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2">Deployment ID</th>
            <th className="px-4 py-2">Workflow Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow) => (
            <tr key={workflow.id}>
              <td className="border px-4 py-2">{workflow.id}</td>
              <td className="border px-4 py-2">{workflow.name}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteWorkflow(workflow.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <input type="file" onChange={(e) => uploadWorkflow(e.target.files[0])} />
    </div>
  );
};

export default DeployedWorkflows;
