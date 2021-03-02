const patriotModels = require('../../../../../models/questions/patriot');
const patriotObjectConverter = require('../../object-converter/patriot-question');
const baseQuestionDocumentBuilder = require('../base-question/base-question');

const getQuestionDocument = (status, data) => {
    return baseQuestionDocumentBuilder(patriotModels, patriotObjectConverter, status, data);
};

module.exports = getQuestionDocument;