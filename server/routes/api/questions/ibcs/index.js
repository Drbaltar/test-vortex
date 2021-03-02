const questionRouter = require('../question-router/question-router');

const { MultChoiceQuestion } = require('../../../../models/questions/ibcs');
const objectConverter = require('../../../../src/database-interface/questions/object-converter/ibcs-question');
const documentBuilder = require('../../../../src/database-interface/questions/question-document-builder/ibcs/ibcs');

const ibcsRouter = questionRouter(MultChoiceQuestion, objectConverter, documentBuilder);

module.exports = ibcsRouter;