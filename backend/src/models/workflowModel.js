const mongoose = require("mongoose");

const WorkflowSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Active", "Pending", "Completed", "Cancelled", "Error"],
      required: true,
    },
    userQuery: { type: String, required: true },
    bpmnXml: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: false,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      require: false,
    },
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workflow", WorkflowSchema);
