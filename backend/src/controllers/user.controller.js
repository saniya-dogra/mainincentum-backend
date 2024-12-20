const { User } = require("../models/authentication/User.models");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Function to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token in the database
    user.refreshtoken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(
      "Error in generateAccessAndRefreshTokens:",
      error.message,
      error.stack
    );
    throw new ApiError(500, "Failed to generate access and refresh tokens");
  }
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, pincode, password, confirmpassword } = req.body;

  if (!name || !email || !phoneNumber || !pincode || !password || !confirmpassword) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirmpassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  const existingUser = await User.findOne({ where: { email, phoneNumber } });

  if (existingUser) {
    throw new ApiError(409, "User already exists! Please login.");
  }

  const newUser = await User.create({ name, email, phoneNumber, pincode, password });
  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User Registered Successfully"));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    throw new ApiError(400, "Phone number and password are required");
  }

  const user = await User.findOne({ where: { phoneNumber } });
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);
  return res
    .status(200)
    .cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // 1 hour
    })
    .json(new ApiResponse(200, { accessToken, refreshToken, user }, "Login successful"));
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findByPk(userId);
  user.refreshtoken = null;
  await user.save();

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Profile
const profile = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not found" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ error: "Token expired, please log in again" });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ error: "Invalid token" });
      }
      return res.status(403).json({ error: "Token verification failed" });
    }

    try {
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return user details
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        pincode:user.pincode,
        phoneNumber:user.phoneNumber,
        
      });
    } catch (dbError) {
      console.error("Database Error:", dbError.message);
      return res.status(500).json({ error: "Failed to fetch user information" });
    }
  });
});

module.exports = { registerUser, loginUser, logoutUser, profile };