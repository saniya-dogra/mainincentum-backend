const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());

const port = process.env.PORT

const db = mysql.createConnection({
    host: process.env.DB_HOST,
  user: process.env.DB_USER,  
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
  connectTimeout: 10000  
});
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to the Hostinger MySQL database.');
});

app.get('/', (req, res) => {
  return res.json("From Backend Side");
});















app.listen(port, () => {
  console.log("listening on port",port);
});
