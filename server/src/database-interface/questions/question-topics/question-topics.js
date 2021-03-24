const dbInterface = require('../../../../src/database-interface/mongodb/mongodb-interface');

const getQuestionTopics = (model) => {
    dbInterface.queryAllWithSelectFields(model, '-_id topics');
};

module.exports = getQuestionTopics;