const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const queryRoutes = require("./routes/queryRoutes");
const workflowsRoutes = require("./routes/workflowRoutes");
const tasksRoutes = require("./routes/tasksRoutes");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Ensure that the frontend React app is allowed to make requests
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers for cross-origin requests
  credentials: true, // Allow sending cookies and JWT tokens with requests
  // preflightContinue: false, // Whether to pass the preflight request to the next handler
  // optionsSuccessStatus: 204, // The status code for successful OPTIONS requests

};
// Apply CORS middleware globally
app.use(cors(corsOptions));

// Session setup for session-based authentication
app.use(
  session({
    secret: "your-secret-key", // Secret key for encrypting session data
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true for production (ensure HTTPS)
  })
);

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Handle preflight requests
app.options("*", cors(corsOptions)); // Enable pre-flight across-the-board

// Routes
app.use("/querymate/auth", userRoutes);
app.use("/querymate/queries", queryRoutes);
app.use("/querymate/workflows", workflowsRoutes);
app.use("/querymate/tasks", tasksRoutes);

// For root route (optional, for testing server health)
app.get("/", (_req, res) => {
  res.send("Server is running");
});

module.exports = app;
