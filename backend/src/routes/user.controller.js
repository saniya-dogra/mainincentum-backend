const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

// 🟢 Register a new user
exports.registerUser = async (req, res, next) => {
  try {
    const { phoneNumber, password, name } = req.body;

    if (!phoneNumber || !password || !name) {
      return next(new ApiError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return next(new ApiError(409, "User already exists"));
    }

    const user = await User.create({ phoneNumber, password, name });

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

// 🟢 Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return next(new ApiError(400, "Phone number and password are required"));
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return next(new ApiError(401, "Invalid phone number or password"));
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return next(new ApiError(401, "Invalid phone number or password"));
    }

    // generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { token, user }, "Login successful"));
  } catch (error) {
    next(error);
  }
};

// 🟢 Logout user
exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

// 🟢 Get user profile (protected)
exports.getUserProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return next(new ApiError(401, "Unauthorized: No user info in token"));
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile fetched successfully"));
  } catch (error) {
    next(error);
  }
};
