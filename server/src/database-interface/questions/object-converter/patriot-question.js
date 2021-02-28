const baseQuestionConverter = require('./base-question');

const convertToDBSchema = (object) => {
    return {
        ...baseQuestionConverter.convertToDBSchema(object),
        gunnery_table: convertGunneryTableToDBSchema(object.gunneryTable),
        topic: convertTopicsToDBSchema(object.topic)
    };
};

const convertGunneryTableToDBSchema = (gunneryTable) => {
    return gunneryTable.map((entry) => {
        return({
            unit_type: entry.unitType,
            test_type: entry.testType,
            table: entry.table,
            subtask: entry.subtask
        });
    });
};

const convertTopicsToDBSchema = (topics) => {
    return {
        major_category: topics.majorCategory,
        sub_category: topics.subCategory,
    };
};

const convertToAppSchema = (object) => {
    return {
        ...baseQuestionConverter.convertToAppSchema(object),
        gunneryTable: convertGunneryTableToAppSchema(object.gunnery_table),
        topic: convertTopicsToAppSchema(object.topic)
    };
};

const convertGunneryTableToAppSchema = (gunneryTable) => {
    return gunneryTable.map((entry) => {
        return({
            unitType: entry.unit_type,
            testType: entry.test_type,
            table: entry.table,
            subtask: entry.subtask
        });
    });
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