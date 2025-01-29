const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authMiddleware = (req, res, next) => {
  // Handle OPTIONS requests (CORS preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Authorization header check
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Extract token from the header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" }); // 403 Forbidden if token is missing
  }

  // Verify the token
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" }); // Invalid or expired token
    }

    req.user = decoded; // Attach decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
