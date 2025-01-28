const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection configuration
const dbConfig = {
    host: 'your_host',        // e.g., 'localhost'
    user: 'your_user',        // your MySQL username
    password: 'your_password', // your MySQL password
    database: 'your_database'  // your database name
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Define a route to fetch data
app.get('/fetch-data', (req, res) => {
    const query = 'SELECT * FROM your_table'; // Replace 'your_table' with your actual table name
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
