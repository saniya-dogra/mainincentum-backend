// src/models/authentication/User.models.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../../db");  // Import the sequelize instance from db/index.js
const jwt = require("jsonwebtoken");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshtoken: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

// Hash password before creating user
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Validate password
User.prototype.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate access token
User.prototype.generateAccessToken = function () {
  return jwt.sign(
    { id: this.id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

// Generate refresh token
User.prototype.generateRefreshToken = function () {
  return jwt.sign(
    { id: this.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { User };
