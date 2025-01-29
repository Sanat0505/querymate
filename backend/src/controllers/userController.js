const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    console.log("New user registered:", user);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// User Login (with JWT)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found with this email. Please sign up first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials. Please check your email and password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration || "1d" }
    );

    console.log("User logged in successfully:", user);
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Update User Profile (Users can update only their profile, Admins can update anyone)
const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userId = req.params.id || req.user.id;

  try {
    let updateData = { name, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Allow role update only if an admin is making the request
    if (role && req.user.role === "admin") {
      updateData.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated:", { userId, updatedData: updateData });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ message: "Error updating user profile, please try again later." });
  }
};

// Delete User Account 
const deleteUser = async (req, res) => {
  const userId = req.params.id; // ID from URL

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`User deleted successfully - ID: ${userId}, Name: ${user.name}, Email: ${user.email}`);
    
  
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Get User Profile
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email role createdAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};



// Get All Users 
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role createdAt");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
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
