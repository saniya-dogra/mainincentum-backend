const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectToDatabase } = require("./src/db");

// Routers
const router = require("./src/routes/user.router");

require("events").EventEmitter.defaultMaxListeners = 15; // Increase event listener limit

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allows cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/users", router);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
// Connect to Database

connectToDatabase();


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

