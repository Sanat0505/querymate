const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();
app.options('*', cors());
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/querymate/auth", userRoutes);
app.use("/querymate/queries", queryRoutes);

module.exports = app;
