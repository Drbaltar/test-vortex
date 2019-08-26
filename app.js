// Add environmental variables
require('dotenv').config();

// Setup express variables
const express = require('express');
const app = express();
const port = 5000;

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true})
    .catch((error) => console.log('Unable to connect to MongoDB: ' + error));
const db = mongoose.connection;
db.once('open', () => {
    console.log('Successfully connected to MongoDB!');
    db.on('error', console.error.bind(console, 'connection error:'));
    
    // Set port for app to listen and print start message
    app.listen(port, () => console.log(`Test Vortex app listening on port ${port}`));
});

// Allow express to parse incoming JSON files
app.use(express.json());

// Add routes
const testRouter = require('./routes/test');
const issueRouter = require('./routes/issue');
const questionRouter = require('./routes/question');

// Set test route
app.use('/test', testRouter);

// Set issue route
app.use('/issues', issueRouter);

// Set question route
app.use('/questions', questionRouter);

// Set default index route
app.get('/', (req, res) => {
    res.send('<h>INDEX PAGE PLACEHOLDER</h>');
});

