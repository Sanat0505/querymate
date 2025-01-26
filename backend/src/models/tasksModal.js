const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  workflowId: { type: String, required: true }, // Reference to Workflow
  assignee: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], required: true },
  userQuery: { type: String }, // Optional for extra details
});

module.exports = mongoose.model("Task", TaskSchema);
