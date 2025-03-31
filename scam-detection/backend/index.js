const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit process on DB connection failure
    }
    console.log('Connected to MySQL Database');
});

// Routes
app.use('/auth', authRoutes);

// Test endpoint
app.get('/', (req, res) => {
    res.send('Scam Detection Backend is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export for testing
module.exports = { app, db };
const fraudRoutes = require("./routes/fraudRoutes");
app.use("/api", fraudRoutes);
