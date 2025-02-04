const mongoose = require("mongoose");
const { mongoURI } = require("./src/config/config"); // Vercel assigns the port dynamically
const app = require("./src/app"); // Import the app from app.js

// Middleware (if any)
app.use(require("express").json()); // For parsing JSON requests

// Connect to MongoDB (ensure it's ready before handling requests)
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Export the Express app for Vercel
module.exports = app;
