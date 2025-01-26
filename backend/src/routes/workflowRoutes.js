const express = require("express");
const {
  getActiveWorkflows,
  updateWorkflowStatus,
  getWorkflowDetails,
  createWorkflow,
} = require("../controllers/workflowController"); // Import workflow controller
const router = express.Router();

//create workflow
router.post("/create", createWorkflow);

// Get all active workflows
router.get("/active", getActiveWorkflows);

// Update workflow status
router.put("/:workflowId/status", updateWorkflowStatus);

// Get workflow details
router.get("/:workflowId", getWorkflowDetails);

module.exports = router;
