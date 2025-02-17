const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectToDatabase } = require("./src/db");

// Routers
const router = require("./src/routes/user.router");
const formRouter = require("./src/routes/individualForm.router");

require("events").EventEmitter.defaultMaxListeners = 15; // Increase event listener limit

const app = express();

// ✅ Middleware Order Fix
app.use(cors({
  origin: [
    "http://localhost:5173",
    // "https://incentum.ai",
    // "https://www.incentum.ai"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Body Parsing BEFORE Routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cookie Parser
app.use(cookieParser());

// ✅ Static Files for Multer
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api", router);
app.use("/api/form", formRouter);

// ✅ API Test Route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// ✅ Connect to Database
connectToDatabase();

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
