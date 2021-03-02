const ibcsModels = require('../../../../../models/questions/ibcs');
const ibcsObjectConverter = require('../../object-converter/ibcs-question');
const baseQuestionDocumentBuilder = require('../base-question/base-question');

const getQuestionDocument = (status, data) => {
    return baseQuestionDocumentBuilder(ibcsModels, ibcsObjectConverter, status, data);
};

module.exports = getQuestionDocument;