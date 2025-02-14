// require("dotenv").config(); // Load environment variables

// const mongoose = require("mongoose");


// const mongoUri = process.env.MONGO_URI;


// const connectToDatabase = async () => {
//   try {

//     await mongoose.connect(mongoUri, {
//       serverSelectionTimeoutMS: 30000,
//     });
//     console.log("Connected to MongoDB successfully!");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error.message);
//     process.exit(1); 
//   }
// };

// module.exports = { connectToDatabase };


require("dotenv").config(); // Load environment variables

const mongoose = require("mongoose");



// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    // Attempt to connect to MongoDB with updated settings
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Timeout set to 30 seconds
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = { connectToDatabase };
