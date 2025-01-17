require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/querymate",
  jwtSecret: process.env.JWT_SECRET || "default-jwt-secret", // Replace with a secure fallback
  huggingFaceApiToken: process.env.HUGGING_FACE_API_TOKEN || null, // Optional
  infuraApiKey: process.env.INFURA_API_KEY || null, // Optional
};