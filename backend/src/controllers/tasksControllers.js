const Task = require("../models/tasksModal");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks..!", error });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { id: taskId },
      { status },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found..!" });
    res.json({ message: "Task status updated successfully..!", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status..!", error });
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