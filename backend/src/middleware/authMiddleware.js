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

const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authMiddleware = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tb-querymate.vercel.app, http://localhost:3000/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the 'Bearer <token>' format
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.log("errorNNN", token);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach decoded token data to req
    next();
  });
};

module.exports = authMiddleware;
