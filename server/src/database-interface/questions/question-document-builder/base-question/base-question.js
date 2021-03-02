const getQuestionDocument = (models, objectConverter, status, data) => {
    validateStatus(status);
    const formattedData = formatDataForDBSchema(objectConverter, status, data);

    return getApplicableModel(models, formattedData);
};

const validateStatus = (status) => {
    if (status !== 'pending' && status !== 'approved')
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
};

const formatDataForDBSchema = (objectConverter, status, data) => {
    const formattedData = objectConverter.convertToDBSchema(data);
    formattedData.status = status;

    return formattedData;
};

const getApplicableModel = (models, formattedData) => {
    switch (formattedData.question_type) {
    case 'Multiple Choice':
        return new models.MultChoiceQuestion(formattedData);
    case 'True or False':
        return new models.TFQuestion(formattedData);
    case 'Fill-in-the-Blank':
        return new models.FillBlankQuestion(formattedData);
    default:
        throw new Error('The \'Question Type\' entry is not a valid entry!');
    }
};

module.exports = getQuestionDocument;