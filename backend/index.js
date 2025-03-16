const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectToDatabase } = require("./src/db");

// Routers
const router = require("./src/routes/user.router");
const formRouter = require("./src/routes/individualForm.router");

// No longer needed with current setup.  Multer handles this internally.
// require("events").EventEmitter.defaultMaxListeners = 15; // Increase event listener limit

const app = express();
const port = process.env.PORT || 5000; //Better to use a const, won't change

// ✅ Middleware Order Fix
app.use(cors({
  origin: [
     "http://localhost:5173",  // Your frontend URL.  Keep this.
     //"https://incentum.ai",    // Add your production URL here when you deploy
     //"https://www.incentum.ai" // Add if you have a www subdomain.
  ],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],  // Correct
  allowedHeaders: ["Content-Type", "Authorization"], // Correct
  credentials: true, // Correct
}));

// ✅ Body Parsing BEFORE Routes
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// ✅ Cookie Parser
app.use(cookieParser());

// ✅ Static Files for Multer  -- Make uploads folder accessible. IMPORTANT!
app.use('/uploads', express.static('uploads'));

// ✅ Routes - good practice to prefix API routes
app.use("/api/users", router);       // User routes (authentication, etc.)
app.use("/api/form", formRouter);  // Form routes

// ✅ API Test Route (Good for debugging)
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// ✅ Connect to Database
connectToDatabase();

// ✅ Start Server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});