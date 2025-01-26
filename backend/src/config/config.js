require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/querymate",
  jwtSecret: process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjNmMzFjZTA1ZjkwNGMxOThhNWNmMiIsIm5hbWUiOiJTYW5hdCBLYWthZGl5YSIsImVtYWlsIjoic2FuYXQxMjM0QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM0NjAzNzc1LCJleHAiOjE3MzQ2MDczNzV9.Nd_jZyFEDY_LxRX7lv2AiLshpAz0fqnTnUsN23H9HoU", // Replace with a secure fallback
  huggingFaceApiToken: process.env.HUGGING_FACE_API_TOKEN || null, // Optional
  infuraApiKey: process.env.INFURA_API_KEY || null, // Optional
};
