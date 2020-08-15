/*
*  This module serves as the index for all routes
*  used in the Test Vortex Express application
*  Author: Kyle McCain
*  Date: 14 August 2020
*/

// Create primary router for the entire Express application
const PrimaryRouter = require('express').Router();

// Add route handlers
PrimaryRouter.use('/api', require('./api'));
PrimaryRouter.use('/login', require('./login'));
PrimaryRouter.use('/logout', require('./logout'));
PrimaryRouter.use('/app', require('./react-app'));

// Add default route handler
PrimaryRouter.get('/', (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}, (req, res) => {
    res.redirect('/app');
});

// Export primary router
module.exports = PrimaryRouter;