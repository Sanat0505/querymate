const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

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

    // Log the saved user for debugging
    console.log("New user registered:", user); // Log user data after saving

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error); // Log server error details (for debugging)
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// // User Login (Simple login without JWT)
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "No account found with this email. Please sign up first." });
//     }

//     // Compare provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid credentials. Please check your email and password." });
//     }

//     // Log successful login for debugging
//     console.log("User logged in successfully:", user); // Log user data after successful login

//     // Send back user data and role (without using JWT)
//     res.json({ message: "Login successful", user: { name: user.name, email: user.email, role: user.role } });
//   } catch (error) {
//     console.error("Error during login:", error); // Log server error details (for debugging)
//     res.status(500).json({ message: "Server error, please try again later." });
//   }
// };

// User Login (with JWT)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found with this email. Please sign up first." });
    }

    // Compare provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials. Please check your email and password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email, }, // Payload (e.g., user ID and role)
      config.jwtSecret,                 // Secret key
      { expiresIn: config.jwtExpiration || "1d" } // Token expiration
    );

    // Log successful login for debugging
    console.log("User logged in successfully:", user);

    // Send back token, user data, and role
    res.json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Update User Profile
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id; // Get user ID from the request (In your case, you are not using JWT anymore)

  try {
    // Prevent users from updating other users' profiles
    if (userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    let updateData = { name, email };

    if (password) {
      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error during user update:", error); // Log server error details (for debugging)
    res.status(500).json({ message: "Error updating user profile, please try again later." });
  }
};

// Delete User Account
const deleteUser = async (req, res) => {
  const userId = req.user.id; // Get user ID from the request (If you decide to reimplement JWT)

  try {
    // Prevent users from deleting other users' accounts
    if (userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during account deletion:", error); // Log server error details (for debugging)
    res.status(500).json({ message: "Error deleting user account, please try again later." });
  }
};

// Get User Profile
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email role"); // Avoid sending password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error during fetching user profile:", error); // Log server error details (for debugging)
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Get All Users (Admin Only)
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden, admin only" });
    }

    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error during fetching users:", error); // Log server error details (for debugging)
    res.status(500).json({ message: "Failed to fetch users, please try again later." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
