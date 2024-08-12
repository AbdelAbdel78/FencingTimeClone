const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'FencingTimeClone'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  
  // Serve the HTML form
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  // // Handle form submission
  app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
  //   // Insert the new user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error inserting user: ' + err.stack);
        res.send('Error signing up.');
        return;
      }
      res.send('User signed up successfully!');
    });
  });
  
  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });