const QuestionRouter = require('express').Router();

QuestionRouter.use('/patriot', require('./patriot'));

module.exports = QuestionRouter;