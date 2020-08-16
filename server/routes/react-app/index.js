/*
*  This module serves as the router for accessing
*  the Test Vortex React web application
*  Author: Kyle McCain
*  Date: 14 August 2020
*/

// Import path dependency
const path = require('path');

// Create router for the React web application
const ReactAppRouter = require('express').Router();

// Middleware that checks to make sure there is a current session
ReactAppRouter.use('/*', (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
});

// Set route to access the built Test Vortex React app
const reactAppPath = path.join(path.resolve(__dirname, '../../../'), 'client', 'build', 'index.html');
ReactAppRouter.get('/*', (req, res) => {
    res.sendFile(reactAppPath);
});

module.exports = ReactAppRouter;