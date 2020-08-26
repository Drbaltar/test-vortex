/*
*  This module serves as the index for all 'Issues' API routes 
*  Author: Kyle McCain
*  Date: 17 August 2020
*/

// Create primary router for the all 'Issues' API routes
const IssuesAPIRouter = require('express').Router();

IssuesAPIRouter.post('/submit', require('./submit'));
IssuesAPIRouter.get('/byID/:id', require('./retrieve-by-id'));
IssuesAPIRouter.get('/all', require('./retrieve-all'));
IssuesAPIRouter.delete('/byID/:id', require('./delete'));

// Export Issues API router
module.exports = IssuesAPIRouter;