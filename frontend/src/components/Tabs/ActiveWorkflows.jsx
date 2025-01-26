import React, { useState } from "react";
// import Modal from "react-modal";
import BpmnView from "./BpmnView";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const WorkflowDetailsModal = ({ workflow, isOpen, onClose }) => {
  if (!workflow) return null;

  console.log(workflow.bpmnXml)
  return (
    // <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-content ">
    //   <h3 className="text-2xl font-semibold mb-4">{workflow.name} Details</h3>
    //   <p><strong>Workflow ID:</strong> {workflow.id}</p>
    //   <p><strong>Start Time:</strong> {new Date(workflow.startTime).toLocaleString()}</p>
    //   <p><strong>Status:</strong> {workflow.status}</p>
    //   <p><strong>User Query:</strong> {workflow.userQuery}</p>

    //   <h4 className="mt-4 font-semibold">BPMN Diagram</h4>
    //   <div className="flex justify-center items-center" style={{ width: "100%", height: "300px", border: "1px solid #ccc", borderRadius: "4px" }}>
    //     <BpmnView bpmnXml={workflow.bpmnXml} />
    //   </div>

    //   <button onClick={onClose} className="mt-4 bg-primary-600 text-white px-4 py-2 rounded">
    //     Close
    //   </button>



    // </Modal>

    <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-[80vw]"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <h3 className=" font-semibold mb-4">{workflow.name} Details</h3>
     <p className="text-sm"><strong>Workflow ID:</strong> {workflow.id}</p>
       <p className="text-sm"><strong>Start Time:</strong> {new Date(workflow.startTime).toLocaleString()}</p>
       <p className="text-sm"><strong>Status:</strong> {workflow.status}</p>
       <p className="text-sm"><strong>User Query:</strong> {workflow.userQuery}</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <h4 className="mt-4 font-semibold">BPMN Diagram</h4>
       <div className="flex justify-center items-center" style={{ width: "100%", height: "300px", border: "1px solid #ccc", borderRadius: "4px" }}>
         <BpmnView bpmnXml={workflow.bpmnXml} />
      </div>
          </Typography>
        </Box>
      </Modal>
  );
};


const ActiveWorkflows = () => {
  const [workflows, setWorkflows] = useState([
    { id: "WF-1", name: "Address Update Workflow", startTime: "2024-12-01T09:00:00", status: "Active", userQuery: "How can I update my address?", bpmnXml: `` },
    { id: "WF-2", name: "Password Reset Workflow", startTime: "2024-12-02T10:00:00", status: "Pending", userQuery: "I forgot my password. How can I reset it?" },
    { id: "WF-3", name: "Refund Process Workflow", startTime: "2024-12-03T11:30:00", status: "Completed", userQuery: "I need a refund for my last purchase." },
    { id: "WF-4", name: "Subscription Cancellation Workflow", startTime: "2024-12-04T14:00:00", status: "Active", userQuery: "How can I cancel my subscription?" },
    { id: "WF-5", name: "Order Status Inquiry Workflow", startTime: "2024-12-05T15:00:00", status: "Active", userQuery: "Can you check the status of my order?" },
    { id: "WF-6", name: "Delivery Issue Workflow", startTime: "2024-12-06T16:30:00", status: "Pending", userQuery: "My order was delivered to the wrong address." },
    { id: "WF-7", name: "Technical Support Workflow", startTime: "2024-12-07T18:00:00", status: "Pending", userQuery: "I am unable to access my account." },
    { id: "WF-8", name: "Billing Issue Workflow", startTime: "2024-12-08T19:00:00", status: "Completed", userQuery: "I was charged twice for a subscription." },
    { id: "WF-9", name: "Account Deletion Workflow", startTime: "2024-12-09T20:00:00", status: "Active", userQuery: "How can I delete my account?" },
    { id: "WF-10", name: "Order Cancellation Workflow", startTime: "2024-12-10T08:00:00", status: "Pending", userQuery: "Can I cancel my order before it ships?" },
    { id: "WF-11", name: "Payment Inquiry Workflow", startTime: "2024-12-11T09:15:00", status: "Active", userQuery: "My payment is not reflecting. What should I do?" },
    { id: "WF-20", name: "Lost Item Workflow", startTime: "2024-12-20T20:00:00", status: "Active", userQuery: "I lost an item I purchased. What can I do?" },
    { id: "WF-31", name: "Payment Inquiry Workflow", startTime: "2025-01-23T15:15:37", status: "Active", userQuery: "I have issue regarding payment", bpmnXml:`` },
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const viewDetails = (workflow) => {
    console.log("workflow",workflow)
    setSelectedWorkflow(workflow);
  };

  // Action Handlers
  const cancelWorkflow = (workflowId) => {
    setWorkflows((prevWorkflows) =>
      prevWorkflows.map((wf) =>
        wf.id === workflowId ? { ...wf, status: "Cancelled" } : wf
      )
    );
  };

  // const viewDetails = (workflowId) => {
  //   alert(`Viewing details for Workflow ID: ${workflowId}`);
  // };

  return (
    <div className="w-full h-auto lg:h-[88vh] max-h-[88vh] overflow-y-scroll bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">Active Workflows</h3>
      <table className="min-w-full bg-gray-100 border">
        <thead className="bg-gray-200 dark:bg-gray-600">
          <tr>
            <th className="px-4 py-2 border">Workflow ID</th>
            <th className="px-4 py-2 border">Workflow Name</th>
            <th className="px-4 py-2 border">Start Time</th>
            <th className="px-4 py-2 border">User Query</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="border px-4 py-2">{workflow.id}</td>
              <td className="border px-4 py-2">{workflow.name}</td>
              <td className="border px-4 py-2">
                {new Date(workflow.startTime).toLocaleString()}
              </td>
              <td className="border px-4 py-2">{workflow.userQuery}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    workflow.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : workflow.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {workflow.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => viewDetails(workflow)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  View Details
                </button>
                {workflow.status !== "Completed" && workflow.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelWorkflow(workflow.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Workflow Details Modal */}
       <WorkflowDetailsModal
        workflow={selectedWorkflow}
        isOpen={selectedWorkflow}
        onClose={() => setSelectedWorkflow(null)}
      />
    </div>
  );
};

export default ActiveWorkflows;
