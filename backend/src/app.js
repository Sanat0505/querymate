const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const queryRoutes = require("./routes/queryRoutes");
const workflowRoutes = require("./routes/workflowRoutes");
const tasksRoutes = require("./routes/tasksRoutes");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Ensure that the frontend React app is allowed to make requests
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers for cross-origin requests
  credentials: true,
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Handle preflight requests
app.options("*", cors(corsOptions)); // Enable pre-flight across-the-board

// Routes
app.use("/querymate/auth", userRoutes);
app.use("/querymate/queries", queryRoutes);
app.use("/querymate/workflows", workflowRoutes);
app.use("/querymate/tasks", tasksRoutes);

// For root route (optional, for testing server health)
app.get("/", (_req, res) => {
  res.send("Server is running");
});

module.exports = app;
