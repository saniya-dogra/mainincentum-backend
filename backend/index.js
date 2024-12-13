const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require("path");
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens
require('dotenv').config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,}));

app.options('*', cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT;

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to the Hostinger MySQL database.');
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
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert data into the database
    const query = `INSERT INTO users (name, phoneNumber, email, pincode, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, phoneNumber, email, pincode, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting data: ', err);
        return res.status(500).json({ message: 'Internal server error.' });
      }

      // Generate a JWT
      const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({
        message: 'User registered successfully!',
        token, // Send the token to the client
      });
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Validate input
  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Phone number and password are required.' });
  }

  try {
    // Check if the phone number exists in the database
    const query = `SELECT * FROM users WHERE phoneNumber = ?`;
    db.query(query, [phoneNumber], async (err, results) => {
      if (err) {
        console.error('Error querying database: ', err);
        return res.status(500).json({ message: 'Internal server error.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const user = results[0];

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid phone number or password.' });
      }

      // Generate a JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login successful!',
        token, // Send the token to the client
      });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the Server
app.listen(port, () => {
  console.log('listening on port', port);
});
