const express = require("express");
const {
  getAllTasks,
  updateTaskStatus,
  sendResolutionEmail,
} = require("../controllers/tasksControllers");
const router = express.Router();

// Get all tasks
router.get("/", getAllTasks);

// Update task status
router.put("/status", updateTaskStatus);

// Send resolution to user
router.post("/:taskId/resolve", sendResolutionEmail);

module.exports = router;
