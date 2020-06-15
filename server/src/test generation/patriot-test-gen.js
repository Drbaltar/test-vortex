const dbInterface = require('../database-interface');

const autoSelectQuestions = (unitType, testType, testLevel, numberOfQuestions, alternateQuestions, callback) => {
    // Set applicable tables from which to select questions
    let applicableTables = [];
    if (testLevel === 'Table IV') {
        applicableTables = ['I', 'II', 'III'];
    } else if (testLevel === 'Table VIII') {
        applicableTables = ['I', 'II', 'III', 'V', 'VI', 'VII'];
    } else {
        callback('Input \'Test Level\' is not a valid option');
    }

    dbInterface.getSampleExistingQuestionsByTables(unitType, testType, applicableTables, numberOfQuestions, (err, queryResults) => {
        if (err) {
            callback(err);
        } else {
            callback(null, queryResults);
        }
    });
};

module.exports = {
    autoSelectQuestions
};