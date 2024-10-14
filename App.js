const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://nithiyan:Nithiav$18@mycluster.cjb8b.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster"; 
const app = express();
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')

// Middleware to parse URL-encoded and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL).then(() => {
    console.log("Successfully connected to the MongoDB Atlas database.");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Root route
app.get('/', (req, res) => {
    res.send("<h3>Full Stack Development - COMP3123 - Nithiyan Annapoorani Valluvan  | 101418712</h3>");
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});