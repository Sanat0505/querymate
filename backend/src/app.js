const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const queryRoutes = require("./routes/queryRoutes");
const workflowRoutes = require("./routes/workflowRoutes");
const tasksRoutes = require("./routes/tasksRoutes");

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["https://tb-querymate.vercel.app/", "http://localhost:3000"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));


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
  res.send(`Server is running ${process.env.PORT}`);
});
app.get("/", (_req, res) => {
  res.send("Server is running on Vercel!");
});

module.exports = app;
