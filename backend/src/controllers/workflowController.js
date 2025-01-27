const Workflow = require("../models/workflowModel");

//create workflow
const createWorkflow = async (req, res) => {
  try {
    const { id, name, startTime, status, userQuery, bpmnXml } = req.body;

    const workflow = new Workflow({
      id,
      name,
      startTime,
      status,
      userQuery,
      bpmnXml,
    });

    await workflow.save();
    res
      .status(201)
      .json({ message: "Workflow created successfully!", workflow });
  } catch (error) {
    res.status(500).json({ message: "Error creating workflow", error });
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

module.exports = {
  getActiveWorkflows,
  updateWorkflowStatus,
  getWorkflowDetails,
  createWorkflow,
};
