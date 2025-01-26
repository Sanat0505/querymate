// const jwt = require("jsonwebtoken");
// const config = require("../config/config");
// const authMiddleware = (req, res, next) => {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   jwt.verify(token, jwtSecret, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }

//     req.user = decoded; // Attach decoded token data to req
//     next();
//   });
//   const authHeader = req.headers["authorization"];
//   console.log(req, authHeader, "authHeader");
//   if (!authHeader) {
//     return res.status(401).send("Authorization header missing");
//   }
//   // console.log("authHeaderJWT",authHeader, config.jwtSecret)

//   // try {
//   //   const decoded = jwt.verify(authHeader, config.jwtSecret);
//   //   req.user = decoded;
//   //   console.log("decoded", decoded);
//   //   next();
//   // } catch (err) {
//   //   return res.status(401).send("Invalid token");
//   // }
// };

// module.exports = authMiddleware;

// authMiddleware.js

// Middleware for handling authentication and CORS settings
const authMiddleware = (req, res, next) => {
  // Set CORS headers to allow specific origins and methods
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tb-querymate.vercel.app, http://localhost:3000"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Check if the session exists and user is authenticated
  if (req.session && req.session.user) {
    req.user = req.session.user; // Attach user data to the request object
    return next(); // Proceed to the next middleware or route handler
  }

  // If the user is not authenticated, return an error response
  return res.status(401).json({ message: "Unauthorized. Please log in." });
};

module.exports = authMiddleware;
