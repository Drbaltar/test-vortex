const { Schema, model } = require('mongoose');

const { 
    fillBlankQuestion,
    multChoiceQuestion, 
    tfQuestion
} = require('./templates/question-templates');

const getQuestionModels = (category, subject) => {
    const fillBlankModels = getFillBlankModels(category, subject);
    const multChoiceModels = getMultChoiceModels(category, subject);
    const tfModels = getTFModels(category, subject);

    return { ...fillBlankModels, ...multChoiceModels, ...tfModels };
};

const getFillBlankModels = (category, subject) => {
    const fillBlankQuestionSchema = new Schema({ ...fillBlankQuestion, ...category});
    const FillBlankQuestion = model('FillBlankQuestion', fillBlankQuestionSchema, 'approved_questions_' + subject);
    const PendingFillBlankQuestion = model('FillBlankQuestion', fillBlankQuestionSchema, 'pending_questions_' + subject);

    return { FillBlankQuestion, PendingFillBlankQuestion };
};

const getMultChoiceModels  = (category, subject) => {
    const multChoiceQuestionSchema = new Schema({ ...multChoiceQuestion, ...category});
    const MultChoiceQuestion = model('MultChoiceQuestion', multChoiceQuestionSchema, 'approved_questions_' + subject);
    const PendingMultChoiceQuestion = model('MultChoiceQuestion', multChoiceQuestionSchema, 'pending_questions_' + subject);

    return { MultChoiceQuestion, PendingMultChoiceQuestion };
};

const getTFModels = (category, subject) => {
    const tfQuestionSchema = new Schema({ ...tfQuestion, ...category});
    const TFQuestion = model('TFQuestion', tfQuestionSchema, 'approved_questions_' + subject);
    const PendingTFQuestion = model('TFQuestion', tfQuestionSchema, 'pending_questions_' + subject);

    return { TFQuestion, PendingTFQuestion };
};

module.exports = {
    getQuestionModels
};