const express = require("express");
const {
  submitQuery,
  getUserQueries,
  parseDescription,
} = require("../controllers/queryController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Submit a Query
router.post("/submitquery", authMiddleware, submitQuery);

// Get All Queries of a User
router.get("/getuserqueries", authMiddleware, getUserQueries);

//for admin - parsing the description of BPMN workflow
router.post("/parse-description", authMiddleware, parseDescription);

module.exports = router;
