const mongoose = require("mongoose");

const WorkflowSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["Active", "Pending", "Completed", "Cancelled", "Error"], 
    required: true 
  },
  userQuery: { type: String, required: true },
  bpmnXml: { 
    type: String, 
    required: true,
    validate: {
      validator: function (value) {
        return value.trim().startsWith("<?xml") && value.trim().endsWith("</definitions>");
      },
      message: "Invalid BPMN XML format.",
    },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
}, { timestamps: true });

module.exports = mongoose.model("Workflow", WorkflowSchema);
