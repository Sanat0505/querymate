const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// User Registration 
const registerUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body; // Default role is 'user'

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    console.log("New user registered:", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// User Login 
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

    console.log("User logged in successfully:", user);
    res.json({ message: "Login successful", user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Update User Profile (search by name)
const updateUser = async (req, res) => {
  const { name, newName, email, password } = req.body; // Use name to find the user

  try {
    if (!name) {
      return res.status(400).json({ message: "User name is required" });
    }

    // Prepare updated data
    const updateData = {};
    if (newName) updateData.name = newName; // If new name is provided
    if (email) updateData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Find user by name and update their data
    const updatedUser = await User.findOneAndUpdate(
      { name: name },  // Search by name instead of ID
      updateData,
      { new: true } // Return the updated user
    ).select("name email role");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user profile, please try again later." });
  }
};

// Delete User Account (by name only)
const deleteUser = async (req, res) => {
  const { name } = req.body; // Accept only the name for deletion

  try {
    // Ensure name is provided
    if (!name) {
      return res.status(400).json({ message: "User name is required" });
    }

    // Find and delete the user by name
    const user = await User.findOneAndDelete({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Error deleting user account, please try again later.",
    });
  }
};


// Get User Profile 
const getUser = async (req, res) => {
  const { name } = req.body; // Accept name instead of ID

  try {
    if (!name) {
      return res.status(400).json({ message: "User name is required" });
    }

    // Find user by name
    const user = await User.findOne({ name }).select("name email role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Return the user details
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    // Fetch users from the database, selecting only name, email, and role fields
    const users = await User.find().select("name email role");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." }); // Handle case with no users
    }

    res.status(200).json(users); // Send the user data in the response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users, please try again later." });
  }
};

module.exports = { getUsers };


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
