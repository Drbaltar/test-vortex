/*
*  This module serves as the router for accessing the Test Vortex logout screen
*  Author: Kyle McCain
*  Date: 14 August 2020
*/

// Import path dependency
const path = require('path');

// Create router for the logout screen
const LogoutRouter = require('express').Router();

// Set route to access the Test Vortex Logout Page
const logoutPath = path.join(path.resolve(__dirname, '../../'), 'public', 'logout', 'logout.html');

LogoutRouter.get('/', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            res.send('An error has occurred while trying to log you out!');
        } else {
            res.sendFile(logoutPath);
        }
    });
});

module.exports = LogoutRouter;