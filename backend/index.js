const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); 

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
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // only send cookie over HTTPS in production
        maxAge: 3600000,  // 1 hour expiry time
      });

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
app.get('/profile', async (req, res) => {
  // Retrieve token from cookies
  const { token } = req.cookies;

  // Validate token
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Token is missing.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from the database
    const query = "SELECT id, name, phoneNumber, email, pincode FROM users WHERE id = ?";
    pool.query(query, [decoded.id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }

      // No user found
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Send user profile
      res.status(200).json({
        message: 'Profile fetched successfully.',
        user: results[0],
      });
    });
  } catch (err) {
    console.error('Invalid or expired token:', err);
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
});
// POST: Logout Endpoint
app.post('/logout', (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Same settings as the login/signup cookies
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// API to create a new form entry
app.post('/forms', (req, res) => {
  const {
    full_name,
    father_name,
    mobile_number,
    email_id,
    dob,
    gender,
    qualification,
    employment_type,
    marital_status,
    spouse_employment_type,
    no_of_dependents,
    pan_number,
    residence_type,
    citizenship,
    permanent_state,
    permanent_district,
    permanent_address,
    permanent_pincode,
    present_state,
    present_district,
    present_address,
    present_pincode
  } = req.body;



  const query = `
    INSERT INTO app_loan_one (
      full_name, father_name, mobile_number, email_id, dob, gender, qualification,
      employment_type, marital_status, spouse_employment_type, no_of_dependents,
      pan_number, residence_type, citizenship, permanent_state, permanent_district,
      permanent_address, permanent_pincode, present_state, present_district,
      present_address, present_pincode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name, father_name, mobile_number, email_id, dob, gender, qualification,
    employment_type, marital_status, spouse_employment_type, no_of_dependents,
    pan_number, residence_type, citizenship, permanent_state, permanent_district,
    permanent_address, permanent_pincode, present_state, present_district,
    present_address, present_pincode
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving form data');
    }
    res.status(201).send('Form data saved successfully');
  });
});


// API to fetch all form entries
app.get('/forms', (req, res) => {
  const query = 'SELECT * FROM app_loan_one';
  
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching form data');
    }
    return res.json(results);
  });
});

// API to fetch a single form entry by ID
// app.get('/forms/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'SELECT * FROM Forms WHERE id = ?';

//   pool.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error fetching data:', err);
//       res.status(500).send('Error fetching form data');
//       return;
//     }
//     if (result.length === 0) {
//       res.status(404).send('Form not found');
//       return;
//     }
//     res.json(result[0]);
//   });
// });

// // API to update a form entry
// app.put('/forms/:id', (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
//   const values = [...Object.values(updates), id];

//   const query = `UPDATE Forms SET ${fields} WHERE id = ?`;

//   pool.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Error updating data:', err);
//       res.status(500).send('Error updating form data');
//       return;
//     }
//     res.send('Form data updated successfully');
//   });
// });

// // API to delete a form entry
// app.delete('/forms/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'DELETE FROM Forms WHERE id = ?';

//   pool.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error deleting data:', err);
//       res.status(500).send('Error deleting form data');
//       return;
//     }
//     res.send('Form data deleted successfully');
//   });
// });


app.post("/form-two", (req, res) => {
  const {
    user_type,
    organisation_name,
    designation_salaried,
    organisation_type,
    work_experience,
    work_experience_duration,
    monthly_salary,
    place_of_posting,
    salary_bank_name,
    company_name,
    company_type,
    incorporation_date,
    designation_self,
    years_in_business,
    years_of_itr_filing,
    property_finalised,
    property_address,
    agreement_executed,
    agreement_mou_value,
    loan_amount_required,
    preferred_banks
  } = req.body;

  const query = `
    INSERT INTO app_loan_two  
    (user_type, organisation_name, designation_salaried, organisation_type, work_experience, 
     work_experience_duration, monthly_salary, place_of_posting, salary_bank_name, company_name, 
     company_type, incorporation_date, designation_self, years_in_business, years_of_itr_filing, 
     property_finalised, property_address, agreement_executed, agreement_mou_value, loan_amount_required, 
     preferred_banks) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    query,
    [
      user_type,
      organisation_name,
      designation_salaried,
      organisation_type,
      work_experience,
      work_experience_duration,
      monthly_salary,
      place_of_posting,
      salary_bank_name,
      company_name,
      company_type,
      incorporation_date,
      designation_self,
      years_in_business,
      years_of_itr_filing,
      property_finalised,
      property_address,
      agreement_executed,
      agreement_mou_value,
      loan_amount_required,
      preferred_banks
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Failed to save loan application.", error: err });
      }
      res.status(201).json({ message: "Loan application submitted successfully!", id: result.insertId });
    }
  );
});

// // 2. READ - Fetch all loan applications
// app.get("/loan-applications", (req, res) => {
//   const query = "SELECT * FROM app_loan_two";

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching data:", err);
//       return res.status(500).json({ message: "Failed to retrieve loan applications.", error: err });
//     }
//     res.status(200).json(results);
//   });
// });

// // 3. READ - Fetch a single loan application by ID
// app.get("/loan-application/:id", (req, res) => {
//   const { id } = req.params;

//   const query = "SELECT * FROM app_loan_two WHERE id = ?";
//   db.query(query, [id], (err, results) => {
//     if (err || results.length === 0) {
//       console.error("Error fetching record:", err);
//       return res.status(404).json({ message: "Loan application not found." });
//     }
//     res.status(200).json(results[0]);
//   });
// });

// // 4. UPDATE - Update a specific loan application
// app.put("/loan-application/:id", (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   const query = "UPDATE app_loan_two SET ? WHERE id = ?";
//   db.query(query, [updates, id], (err, result) => {
//     if (err || result.affectedRows === 0) {
//       console.error("Error updating data:", err);
//       return res.status(404).json({ message: "Loan application not found or failed to update." });
//     }
//     res.status(200).json({ message: "Loan application updated successfully." });
//   });
// });

// // 5. DELETE - Delete a loan application by ID
// app.delete("/loan-application/:id", (req, res) => {
//   const { id } = req.params;

//   const query = "DELETE FROM app_loan_two WHERE id = ?";
//   db.query(query, [id], (err, result) => {
//     if (err || result.affectedRows === 0) {
//       console.error("Error deleting record:", err);
//       return res.status(404).json({ message: "Loan application not found." });
//     }
//     res.status(200).json({ message: "Loan application deleted successfully." });
//   });
// });











































// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
