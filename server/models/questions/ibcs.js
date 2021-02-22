const questionModelBuilder = require('./question-model-builder');
const category = require('./categories/ibcs-questions').ibcsQuestionCategories;

module.exports = questionModelBuilder.getQuestionModels(category, 'ibcs');