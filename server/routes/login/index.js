/*
*  This module serves as the router for accessing the Test Vortex login screen
*  Author: Kyle McCain
*  Date: 14 August 2020
*/

// Import dependencies
const path = require('path');
const passport = require('passport');

// Create router for the login screen
const LoginRouter = require('express').Router();

// Set route to access the Test Vortex Login Page
const loginPath = path.join(path.resolve(__dirname, '../../'), 'public', 'login', 'login.html');
LoginRouter.get('/', (req, res) => {
    res.sendFile(loginPath);
});

// Set POST request for logging into a new session
LoginRouter.post('/', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

module.exports = LoginRouter;