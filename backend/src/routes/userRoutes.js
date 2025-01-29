
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

// Base path: /querymate/auth

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated user routes
router.put("/update", authMiddleware, updateUser); // Protected route for updating profile
router.delete("/delete/:id", authMiddleware, deleteUser); // Protected route for deleting user

// Protected route to get current user (authenticated only)
router.get("/user", authMiddleware, getUser);

// Get all users (accessible by any authenticated user)
router.get("/users", authMiddleware, getUsers); // Allow all authenticated users to access this route

module.exports = router;
