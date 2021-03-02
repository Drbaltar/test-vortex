const QuestionRouter = require('express').Router();

QuestionRouter.use('/patriot', require('./patriot'));
QuestionRouter.use('/ibcs', require('./ibcs'));

module.exports = QuestionRouter;