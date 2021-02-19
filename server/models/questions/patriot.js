const mongoose = require('mongoose');

const templates = require('./templates/question-templates');
const category = require('./categories/patriot-questions').patriotQuestionCategories;

const fillBlankQuestionSchema = new mongoose.Schema({ ...templates.fillBlankQuestion, ...category});
const multChoiceQuestionSchema = new mongoose.Schema({ ...templates.multChoiceQuestion, ...category});
const tfQuestionSchema = new mongoose.Schema({ ...templates.tfQuestion, ...category});

const FillBlankQuestion = mongoose.model('FillBlankQuestion', fillBlankQuestionSchema, 'approved_questions_patriot');
const MultChoiceQuestion = mongoose.model('MultChoiceQuestion', multChoiceQuestionSchema, 'approved_questions_patriot');
const TFQuestion = mongoose.model('TFQuestion', tfQuestionSchema, 'approved_questions_patriot');

const PendingFillBlankQuestion = mongoose.model('FillBlankQuestion', fillBlankQuestionSchema, 'pending_questions_patriot');
const PendingMultChoiceQuestion = mongoose.model('MultChoiceQuestion', multChoiceQuestionSchema, 'pending_questions_patriot');
const PendingTFQuestion = mongoose.model('TFQuestion', tfQuestionSchema, 'pending_questions_patriot');

module.exports = {
    FillBlankQuestion,
    MultChoiceQuestion,
    TFQuestion,
    PendingFillBlankQuestion,
    PendingMultChoiceQuestion,
    PendingTFQuestion
};