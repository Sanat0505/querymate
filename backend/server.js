const express = require("express");
const mongoose = require("mongoose");
const { mongoURI, port } = require("./src/config/config");
const app = require("./src/app"); // Import the app from app.js

// Initialize express app
//const app = express();
const PORT = port || 3001; // Fallback to default port if none provided

// Middleware (if any)
app.use(express.json()); // For parsing JSON requests

// Connect to MongoDB
mongoose
  .connect(mongoURI) // Removed deprecated options
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    
    // Start the server after MongoDB connection is successful
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Global error handler
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1); // Exit process when there's an uncaught exception
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled promise rejection:", err);
  process.exit(1); // Exit process when there's an unhandled promise rejection
});
