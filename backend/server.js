const app = require("./src/app");
const mongoose = require("mongoose");
const { mongoURI, port } = require("./src/config/config");

const PORT = port;

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
