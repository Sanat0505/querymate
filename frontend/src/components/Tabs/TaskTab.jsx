import React, { useState } from "react";
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Tasks = () => {
  // Static data (initial task list)
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
    {
      id: "TASK_025",
      name: "Verify Tax Filing Status",
      workflowId: "WF-25",
      assignee: "Zoro",
      dueDate: "2024-12-30T11:00:00",
      status: "Pending",
    },
    {
      id: "TASK_026",
      name: "Optimize Database Performance",
      workflowId: "WF-26",
      assignee: "Luufy",
      dueDate: "2024-12-22T16:30:00",
      status: "Pending",
    },
    {
      id: "TASK_027",
      name: "Analyze Sales Data",
      workflowId: "WF-27",
      assignee: "Ramesh Bhal",
      dueDate: "2024-12-18T14:00:00",
      status: "Completed",
    },
    {
      id: "TASK_028",
      name: "Perform System Maintenance",
      workflowId: "WF-28",
      assignee: "Sanat Kakadiya",
      dueDate: "2024-12-21T13:00:00",
      status: "In Progress",
    },
    {
      id: "TASK_029",
      name: "Audit Vendor Contracts",
      workflowId: "WF-29",
      assignee: "Aarti Majumdar",
      dueDate: "2024-12-25T16:00:00",
      status: "Pending",
    },
    {
      id: "TASK_030",
      name: "Improve SEO Rankings",
      workflowId: "WF-30",
      assignee: "Anushka Jajal",
      dueDate: "2024-12-28T15:00:00",
      status: "In Progress",
    },
    {
      id: "TASK_031",
      name: "solving payment issue",
      workflowId: "WF-31",
      assignee: "Sanat Kakadiya",
      dueDate: "2025-01-23T15:15:37",
      status: "In Progress",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [solutionMessage, setSolutionMessage] = useState("");

  // Function to handle modal open/close
  const handleModalOpen = (task) => {
    setCurrentTask(task);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSolutionMessage("");
  };

  // Simulated email sending function
  const sendEmail = (email, subject, message) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Email sent to ${email} with subject "${subject}" and message: ${message}`);
        resolve();
      }, 1000); // Simulate 1-second email sending delay
    });
  };

  // Handle task completion
  const handleTaskComplete = async () => {
    if (!solutionMessage.trim()) {
      toast.error("Solution message cannot be empty!");
      return;
    }

    try {
      toast.promise(
        sendEmail(
          currentTask.email,
          `Solution to your query: ${currentTask.name}`,
          solutionMessage
        ),
        {
          pending: 'Sending email...',
          success: 'Email sent successfully to the user...!',
          error: 'Failed to send email!',
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? { ...task, status: "Completed" } : task
        )
      );

      handleModalClose(); // Close the modal after completing the task
    } catch (error) {
      console.error("Error sending email:", error.message);
      toast.error("Failed to complete the task!");
    }
  };

  return (
    <div className="w-full h-auto lg:h-[88vh] max-h-[88vh] overflow-y-scroll bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Pending Tasks
      </h3>
      <table className="min-w-full bg-gray-100 dark:bg-gray-700 border rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-600">
          <tr>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Task ID</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Task Name</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Workflow ID</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Assignee</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Due Date</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Status</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Action</th>
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
                    onClick={() => handleModalOpen(task)}
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

      {/* Modal for writing a solution */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <h2 className="text-lg font-semibold mb-4">Write Solution</h2>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your solution here..."
            value={solutionMessage}
            onChange={(e) => setSolutionMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
            className="mt-10"
            onClick={handleTaskComplete}
          >
            Send & Complete
          </Button>
        </Box>
      </Modal>
    </div>
  );

};

export default Tasks;
