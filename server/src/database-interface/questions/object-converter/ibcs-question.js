const baseQuestionConverter = require('./base-question');

const convertToDBSchema = (object) => {
    return {
        ...baseQuestionConverter.convertToDBSchema(object),
        test_type: object.testType,
        topic: convertTopicsToDBSchema(object.topic)
    };
};

const convertToAppSchema = (object) => {
    return {
        ...baseQuestionConverter.convertToAppSchema(object),
        testType: object.test_type,
        topic: convertTopicsToAppSchema(object.topic)
    };
};

const convertTopicsToDBSchema = (topics) => {
    return {
        major_category: topics.majorCategory,
        sub_category: topics.subCategory,
    };
};

const convertTopicsToAppSchema = (topics) => {
    return {
        majorCategory: topics.major_category,
        subCategory: topics.sub_category,
    };
};

module.exports = {
    convertToDBSchema,
    convertToAppSchema
};