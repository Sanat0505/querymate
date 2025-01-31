const Workflow = require("../models/workflowModel");

//create workflow
const createWorkflow = async (req, res) => {
  try {
    const { name, userQuery, bpmnXml, userEmail, userId } = req.body; 

    const workflow = new Workflow({
      id: `WF-${Date.now()}`,  
      name,
      startTime: new Date().toISOString(), 
      status: "Active",
      userQuery,
      bpmnXml,
      userEmail,
      userId  
    });

    await workflow.save();
    res.status(201).json({ message: "Workflow created successfully!", workflow });
  } catch (error) {
    console.error("Error creating workflow:", error); // ✅ Log the actual error
    res.status(500).json({ message: "Error creating workflow", error: error.message });
  }
};


// Get all active workflows
const getActiveWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({ status: "Active" });
    res.json(workflows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching active workflows..!", error });
  }
};

// Get All Users (Admin Only)
const getAllWorkflows = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Forbidden, admin only" });
    // }

    const workflows = await Workflow.find();
    res.json(workflows);
  } catch (error) {
    console.error("Error during fetching workflows:", error); // Log server error details (for debugging)
    res.status(500).json({ message: "Failed to fetch workflows, please try again later." });
  }
};
// Update workflow status
const updateWorkflowStatus = async (req, res) => {
  try {
    const { workflowId } = req.params;
    const { status } = req.body;

    const updatedWorkflow = await Workflow.findOneAndUpdate(
      { id: workflowId },
      { status },
      { new: true }
    );

    if (!updatedWorkflow)
      return res.status(404).json({ message: "Workflow not found..!" });
    res.json({
      message: "Workflow status updated successfully..!",
      workflow: updatedWorkflow,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating workflow status..!", error });
  }
};

// Get workflow details
const getWorkflowDetails = async (req, res) => {
  try {
    const { workflowId } = req.params;
    const workflow = await Workflow.findOne({ id: workflowId });

    if (!workflow)
      return res.status(404).json({ message: "Workflow not found..!" });
    res.json(workflow);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching workflow details..!", error });
  }
};
// Delete a workflow
const deleteWorkflow = async (req, res) => {
    try {
      const { workflowId } = req.params;
      await Workflow.findOneAndDelete({ id: workflowId });
      res.json({ message: "Workflow deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting workflow", error });
    }
  };
module.exports = {
  getActiveWorkflows,
  updateWorkflowStatus,
  getWorkflowDetails,
  createWorkflow,
  deleteWorkflow,
  getAllWorkflows
};
