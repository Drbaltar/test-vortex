const { 
    MultChoiceQuestion,
    TFQuestion,
    FillBlankQuestion
} = require('../../../../../models/questions/patriot');

const { convertToDBSchema } = require('../../object-converter/patriot-question');

const getQuestionDocument = (status, data) => {
    validateStatus(status);

    switch (data.questionType) {
    case 'Multiple Choice':
        return buildMultChoiceQuestionDocument(status, data);
    case 'True or False':
        return buildTFQuestionDocument(status, data);
    case 'Fill-in-the-Blank':
        return buildFillBlankQuestionDocument(status, data);
    default:
        throw new Error('The \'Question Type\' entry is not a valid entry!');
    }
};

const buildMultChoiceQuestionDocument = (status, data) => {
    const formattedData = formatDataForDBSchema(status, data);
    return new MultChoiceQuestion(formattedData);
};

const buildTFQuestionDocument = (status, data) => {
    const formattedData = formatDataForDBSchema(status, data);
    return new TFQuestion(formattedData);
};

const buildFillBlankQuestionDocument = (status, data) => {
    const formattedData = formatDataForDBSchema(status, data);
    return new FillBlankQuestion(formattedData);
};

const validateStatus = (status) => {
    if (status !== 'pending' && status !== 'approved')
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
};

const formatDataForDBSchema = (status, data) => {
    const formattedData = convertToDBSchema(data);
    formattedData.status = status;

    return formattedData;
};

module.exports = getQuestionDocument;