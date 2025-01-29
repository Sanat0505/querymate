const express = require("express");
const mongoose = require("mongoose");
const { mongoURI, port } = require("./src/config/config");
const app = require("./src/app");

const PORT = port || 3001;

// Connect to MongoDB (no options needed for Mongoose v6+)
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

// Error handlers (keep these)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});