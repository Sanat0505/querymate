const express = require("express");
const {
  getAllTasks,
  updateTaskStatus,
  sendResolutionEmail,
  getTasksByWorkflowId
} = require("../controllers/tasksControllers");
const router = express.Router();

// Get all tasks
router.get("/", getAllTasks);
router.get("/:workflowId", getTasksByWorkflowId);

// Update task status
router.put("/status", updateTaskStatus);

// Send resolution to user
router.post("/:taskId/resolve", sendResolutionEmail);

module.exports = router;
