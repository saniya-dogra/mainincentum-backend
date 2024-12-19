const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const router = require('./src/routes/user.router');
const { sequelize } = require('./src/db');
const formRouter = require('./src/routes/forms/formOne.router');

const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({ storage });



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

// routesssssss
app.use("/api/v1/users",router )
app.use("/api/v1/forms",formRouter )


sequelize.sync()
  .then(() => console.log('User table created or synced successfully!'))
  .catch(err => console.log('Failed to create/sync user table:', err));

  sequelize.sync()
  .then(() => {
    console.log(' form one Table created or updated successfully!');
  })
  .catch(error => {
    console.error('Unable to create or update the table:', error);
  });

  
sequelize.sync({ alter: true })
.then(() => {
  console.log("AppLoanTwo table created or updated successfully.");
})
.catch((err) => {
  console.error("Error creating or updating table: ", err);
});
sequelize.sync({ alter: true })
.then(() => {
  console.log("AppLoanthree table created or updated successfully.");
})
.catch((err) => {
  console.error("Error creating or updating table: ", err);
});



// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});