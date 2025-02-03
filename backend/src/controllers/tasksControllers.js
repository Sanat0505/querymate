const sendEmail = require("../services/emailService");
const Task = require("../models/tasksModal");
const Workflow = require("../models/workflowModel");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks..!", error });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status, solution } = req.body;

    // Update the specific task status
    const updatedTask = await Task.findOneAndUpdate(
      { id: taskId },
      { status },
      { new: true }
    );

    // Check if all tasks related to this workflow are completed
    const remainingTasks = await Task.find({
      workflowId: updatedTask.workflowId,
      status: { $ne: "Completed" },
    });

    if (remainingTasks.length === 0) {
      // If all tasks are completed, update workflow status to "Completed"
      const updatedWorkflow = await Workflow.findOneAndUpdate(
        { id: updatedTask.workflowId },
        { status: "Completed", solution },
        { new: true }
      );

      // Fetch user email from workflow
      const userEmail = updatedWorkflow.userEmail;

      // Notify the user via email with the final solution
      await sendEmail(
        userEmail,
        "Your Query Has Been Resolved!",
        `Dear User,\n\nYour query "${updatedWorkflow.userQuery}" has been successfully resolved.\n\nSolution:\n"${solution}"\n\nBest Regards,\nQuerymate Support`
      );

      console.log(`User notified at ${userEmail}`);
    }

    res.json({ message: "Task status updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
};


// Send resolution to user
const sendResolutionEmail = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { email, resolutionMessage } = req.body;

    // Logic to send email (e.g., using nodemailer)
    // sendEmail(email, resolutionMessage);

    res.json({ message: "Resolution email sent successfully..!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending resolution email..!", error });
  }
};

module.exports = {
    getAllTasks,
    updateTaskStatus,
    sendResolutionEmail
  };