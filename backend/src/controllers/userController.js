const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body; // Default role is 'user'

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin reviews user requests for admin role
const requestAdminRole = async (req, res) => {
  const { userId } = req.user;
  const { requestAdmin } = req.body;

  try {
    if (requestAdmin) {
      // Send notification to admin for review
      sendAdminReviewNotification(userId);
      res.json({ message: "Request sent for admin review" });
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error });
  }
};

// Function to send admin review notification (mocked for now)
const sendAdminReviewNotification = (userId) => {
  console.log(
    `Sending notification: User with ID ${userId} has requested admin status.`
  );
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("request", req);
  try {
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res
        .status(400)
        .send({ message: "Invalid credentials... User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid, "isPasswordValid", "user", user);

    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid credentials... Please check email or password...",
      });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    // console.log("Generated JWT Token:", token);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update User Profile
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id; // Get user ID from the JWT payload

  try {
    let updateData = { name, email };

    if (password) {
      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile", error });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user.id; // Get user ID from the JWT payload

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user account", error });
  }
};

const getUser = async (req, res) => {
  try {
    console.log("log id", req.user);
    const user = await User.findById(req.user._id).select("-password");
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  requestAdminRole,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
