const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'employee_db', 
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, phoneNumber, gender, nric } = req.body;
  console.log("Testing 123");
  // SQL query to insert form data into the database
  const query = 'INSERT INTO employees (name, email, phone_number, gender, nric) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [name, email, phoneNumber, gender, nric], (err, result) => {
    if (err) {
      console.error('Error inserting data into database: ', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Form submitted successfully', data: result });
  });
});

// Endpoint to fetch data from the database
app.get('/get-employees', (req, res) => {
  const query = 'SELECT * FROM employees';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database: ', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Results from database:', results);
    res.status(200).json(results);
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
