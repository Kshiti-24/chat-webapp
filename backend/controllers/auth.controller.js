import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      username,
      password,
      confirmPassword,
      gender,
      phoneNumber,
    } = req.body;
    if (
      !fullName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !gender ||
      !phoneNumber
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email or username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
      gender,
      phoneNumber,
      profilePicture: gender === "male" ? maleProfilePic : femaleProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      location: user.location,
      currentStatus: user.currentStatus,
      lastActive: user.lastActive,
      additionalInfo: user.additionalInfo,
      socialLinks: user.socialLinks,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserInfo = async (userId, updates) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

export const updateUserData = async (req, res) => {
  try {
    const updates = req.body.updatedData || req.body;
    const userId = updates.userId;

    if (!userId) {
      return res.status(400).json({ error: "User id is required" });
    }

    // Do not allow changing _id
    delete updates._id;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      gender: updatedUser.gender,
      phoneNumber: updatedUser.phoneNumber,
      bio: updatedUser.bio,
      location: updatedUser.location,
      currentStatus: updatedUser.currentStatus,
      lastActive: updatedUser.lastActive,
      additionalInfo: updatedUser.additionalInfo,
      socialLinks: updatedUser.socialLinks,
    });
  } catch (error) {
    console.error("Error in updateUserData:", error);
    res.status(500).json({ error: "Server error" });
  }
};
