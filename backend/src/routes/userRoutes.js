const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//api routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update",  updateUser);
router.delete("/delete", deleteUser);
router.get("/user", getUser);
router.get("/users", getUsers);

module.exports = router;