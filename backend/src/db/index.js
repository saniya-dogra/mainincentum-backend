require("dotenv").config(); // Load environment variables

const mongoose = require("mongoose");

// Construct MongoDB connection URI from environment variables
const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    // Attempt to connect to MongoDB with updated settings
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000, // Timeout set to 30 seconds
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = { connectToDatabase };
