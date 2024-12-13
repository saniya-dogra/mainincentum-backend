const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
pool.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the app if the connection fails
  } else {
    console.log('Connected to the database.');
  }
});

// POST: Signup Endpoint
app.post('/signup', async (req, res) => {
  const { name, phoneNumber, email, pincode, password } = req.body;

  // Validate input
  if (!name || !phoneNumber || !email || !pincode || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const query = "INSERT INTO users (name, phoneNumber, email, pincode, password) VALUES (?, ?, ?, ?, ?)";
    pool.query(query, [name, phoneNumber, email, pincode, hashedPassword], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Failed to register user.' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: result.insertId, email },
        process.env.JWT_SECRET, // Ensure this is defined in your .env
        { expiresIn: '1h' }
      );

      // Successful response
      res.status(201).json({
        message: 'User registered successfully.',
        token,
      });
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// POST: Login Endpoint
app.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Validate input
  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Phone number and password are required.' });
  }

  try {
    // Check if user exists
    const query = "SELECT * FROM users WHERE phoneNumber = ?";
    pool.query(query, [phoneNumber], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Internal server error.' });
      }

      // No user found
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const user = results[0];

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid phone number or password.' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET, // Ensure this is defined in your .env
        { expiresIn: '1h' }
      );

      // Successful login response
      res.status(200).json({
        message: 'Login successful!',
        token,
      });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
