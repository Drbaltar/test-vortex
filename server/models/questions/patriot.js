const questionModelBuilder = require('./question-model-builder');
const category = require('./categories/patriot-questions').patriotQuestionCategories;

module.exports = questionModelBuilder.getQuestionModels(category, 'patriot');