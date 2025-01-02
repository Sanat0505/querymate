require("dotenv").config();

const config = {
  port: process.env.PORT || 3001,
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/querymate",
  jwtSecret:
    process.env.JWT_SECRET ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWRkNmU2NTYyMDgxNDdlMDk0ZTBlNiIsIm5hbWUiOiJTYW5hdCBLYWthZGl5YSIsImVtYWlsIjoic2FuYXQxMjNAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzQyNzUxNDAsImV4cCI6MTczNDI3ODc0MH0.z05HoGC7kzgbkEG2rymF6oyhJezYbIAwJjnzwpOry0M",
  huggingFaceApiToken: process.env.HUGGING_FACE_API_TOKEN,
  infuraApiKey: process.env.INFURA_API_KEY,
};
module.exports = config;
