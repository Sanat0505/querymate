const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  queryText: { type: String, required: true },
  classification: { type: String },
  response: { type: String },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Query", querySchema);
