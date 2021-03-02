const { Schema, model } = require('mongoose');

const { 
    fillBlankQuestion,
    multChoiceQuestion, 
    tfQuestion
} = require('./templates/question-templates');

const getQuestionModels = (category, subject) => {
    const FillBlankQuestion = getFillBlankModel(category, subject);
    const MultChoiceQuestion = getMultChoiceModel(category, subject);
    const TFQuestion = getTFModel(category, subject);

    return { FillBlankQuestion, MultChoiceQuestion, TFQuestion };
};

const getFillBlankModel = (category, subject) => {
    const fillBlankQuestionSchema = new Schema({ ...fillBlankQuestion, ...category});
    const FillBlankQuestion = model('FillBlankQuestion_' + subject, fillBlankQuestionSchema, subject + '_questions');

    return FillBlankQuestion;
};

const getMultChoiceModel  = (category, subject) => {
    const multChoiceQuestionSchema = new Schema({ ...multChoiceQuestion, ...category});
    const MultChoiceQuestion = model('MultChoiceQuestion_' + subject, multChoiceQuestionSchema, subject + '_questions');

    return MultChoiceQuestion;
};

const getTFModel = (category, subject) => {
    const tfQuestionSchema = new Schema({ ...tfQuestion, ...category});
    const TFQuestion = model('TFQuestion_' + subject, tfQuestionSchema, subject + '_questions');

    return TFQuestion;
};

module.exports = {
    getQuestionModels
};