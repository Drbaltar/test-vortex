// Add environmental variables
require('dotenv').config();

// Setup express variables
const express = require('express');
const app = express();
const port = 3000;

// // Connect to MongoDB
// const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', () => {
//     console.log('Successfully connected to MongoDB!');
// });

// Allow express to parse incoming JSON files
app.use(express.json());

// Add routes
const testRouter = require('./routes/test');
const issueRouter = require('./routes/issue');
const questionRouter = require('./routes/question');

// Set test route
app.use('/test', testRouter);

// Set issue route
app.use('/submitIssue', issueRouter);

// Set question route
app.use('/submitQuestion', questionRouter);

// Set default index route
app.get('/', (req, res) => {
    res.send('<h>INDEX PAGE PLACEHOLDER</h>');
});

// Set port for app to listen and print start message
app.listen(port, () => console.log(`Test Vortex app listening on port ${port}`));