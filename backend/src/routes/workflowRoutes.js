const express = require("express");
const {
  getActiveWorkflows,
  updateWorkflowStatus,
  getWorkflowDetails,
  createWorkflow,
  deleteWorkflow,
  getAllWorkflows
} = require("../controllers/workflowController"); // Import workflow controller
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

//create workflow
router.post("/create",authMiddleware, createWorkflow);

// Get all active workflows
router.get("/active",authMiddleware, getActiveWorkflows);
// Get all workflows
router.get("/workflows", getAllWorkflows);

// Update workflow status
router.put("/:workflowId/status",authMiddleware, updateWorkflowStatus);

// Get workflow details
router.get("/:workflowId", getWorkflowDetails);

//delete workflow
router.delete("/:workflowId",authMiddleware, deleteWorkflow);

module.exports = router;
