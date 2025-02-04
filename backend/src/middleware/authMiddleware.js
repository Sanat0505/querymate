const jwt = require("jsonwebtoken");
const config = require("../config/config");

const allowedOrigins = [
  "https://tb-querymate.vercel.app",
  "http://localhost:3000",
];

const authMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    // res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.error("Authorization header is missing in the request");
    return res.status(401).json({ error: true, message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.error("Authorization token is missing in the header");
    return res.status(403).json({ error: true, message: "No token provided" });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ error: true, message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach decoded token data to req
    next();
  });
};

module.exports = authMiddleware;
