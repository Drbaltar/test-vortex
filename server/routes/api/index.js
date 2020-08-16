/*
*  This module serves as the index for all API routes
*  used in the Test Vortex Express application
*  Author: Kyle McCain
*  Date: 14 August 2020
*/

// Create API router
const APIRouter = require('express').Router();

// Add route handlers
APIRouter.use('/issues', require('./issues'));
APIRouter.use('/questions', require('./questions'));
APIRouter.use('/tests', require('./tests'));
APIRouter.use('/users', require('./users'));

// Export API router
module.exports = APIRouter;