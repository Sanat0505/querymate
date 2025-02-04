import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { updateTaskStatusApi, getWorkflowApi } from "../../services/api.jsx";

const Tasks = ({ tasks, updateTasks }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [solutionMessage, setSolutionMessage] = useState("");

  // Open modal when marking a task as complete
  const handleModalOpen = (task) => {
    setCurrentTask(task);
    setOpenModal(true);
  };

  // Close modal
  const handleModalClose = () => {
    setOpenModal(false);
    setSolutionMessage("");
  };

  // Handle task completion
  const handleTaskComplete = async () => {
    if (!solutionMessage.trim()) {
      toast.error("Solution message cannot be empty!");
      return;
    }

    try {
      await toast.promise(
        updateTaskStatusApi(currentTask.id, "Completed"),
        {
          pending: "Updating task status...",
          success: "Task marked as completed!",
          error: "Failed to update task status!",
        }
      );

      // Update the task in the frontend state
      updateTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? { ...task, status: "Completed" } : task
        )
      );

      // Check if all tasks in the workflow are completed
      const workflowDetails = await getWorkflowApi(currentTask.workflowId);
      console.log("workflowDetails",workflowDetails)

      const remainingTasks = workflowDetails.data.filter(
        (task) => task.status !== "Completed"
      );

      // If all tasks are completed, mark workflow as completed and send final solution
      if (remainingTasks.length === 0) {
        await updateTaskStatusApi(currentTask.workflowId, "Completed", solutionMessage);
        toast.success("Workflow completed! User will be notified.");
      }

      handleModalClose(); // Close modal after updating the task
    } catch (error) {
      console.error("Error completing task:", error);
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
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Task Name</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Workflow ID</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Assignee</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Due Date</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Status</th>
            <th className="px-4 py-2 border text-left text-gray-900 dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
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
            borderRadius: "8px",
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
            className="bg-primary-600"
            sx={{ mt: 2 }}
            onClick={handleTaskComplete}
          >
            Send & Complete
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2, ml: 2 }}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Tasks;
