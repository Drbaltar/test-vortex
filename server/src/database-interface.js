const { MultChoiceQuestion } = require('../models/questions/patriot');

// Returns a sample size of the appropriate questions based on the passed in unit type, test type and applicable tables
const getSampleExistingQuestionsByTables = (unitType, testType, applicableTables, numOfQuestions, callback) => {
    // Declare the existing question entry using MultChoiceQuestion model to represent 'Existing' database
    let entry = MultChoiceQuestion;

    entry.aggregate([{ $unwind: '$gunnery_table' }, 
        { $match: {'gunnery_table.unit_type': unitType, 'gunnery_table.test_type': testType, 'gunnery_table.table': { $in: applicableTables }}},
        { $sample: { size: parseInt(numOfQuestions)}}]).exec()
        .then(queryResults => callback(null, queryResults))
        .catch(err => callback(err));
};

/*------------------------Operations for Requesting Topic Categories-----------------------*/

// Returns an array of topic categories (approved and pending) based on the input gunnery table and subtask
const getTopicCategories = (unitType, table, subtask, callback) => {
    Promise.all([
        MultChoiceQuestion.find({ status: 'approved'}).where('gunnery_table').elemMatch({'unit_type': unitType, 'table': table, 'subtask': subtask}).exec(),
        MultChoiceQuestion.find({ status: 'pending'}).where('gunnery_table').elemMatch({'unit_type': unitType, 'table': table, 'subtask': subtask}).exec()
    ])
        .then(queryResults => callback(null, queryResults))
        .catch(err => callback(err));
};

/*---------------Operations for Requesting Questions by Gunnery Table/Subtask--------------*/

// Returns the number of questions per table and subtask based on unit and test type
const getNumQuestionsPerSubtask = (unitType, testType, callback) => {
    // Declare the existing question entry using MultChoiceQuestion model to represent 'Existing' database
    let entry = MultChoiceQuestion;
    const batteryTables = [['I', 18], ['II', 18], ['III', 8], ['V', 3], ['VI', 8], ['VII', 13]];
    const battalionTables = [['I', 13], ['II', 22], ['III', 8], ['V', 5], ['VI', 7], ['VII', 12]];

    const getGunneryPipelines = (tables) => {
        let allPipelines = {};
        for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
            for (let subtaskIndex = 0; subtaskIndex < tables[tableIndex][1]; subtaskIndex++) {
                allPipelines[tables[tableIndex][0] + '-' + (subtaskIndex + 1)] = requestCount(tables[tableIndex][0], subtaskIndex + 1);
            }
        }
        return allPipelines;
    };

    const requestCount = (table, subtask) => {
        return ([
            { $match: { 'gunnery_table.unit_type': unitType, 'gunnery_table.test_type': testType,
                'gunnery_table.table': table, 'gunnery_table.subtask': subtask }},
            { $count: 'count' }
        ]);
    };

    const formatResults = (queryResults) => {
        return new Promise((resolve) => {
            let formattedResults = {};

            for (const property in queryResults) {
                let table = property.split('-')[0];
                if (!formattedResults[table]) { formattedResults[table] = []; }
                if (queryResults[property].length === 0) {
                    formattedResults[table].push(0);
                } else {
                    formattedResults[table].push(queryResults[property][0].count);
                }
            }
            
            resolve(formattedResults);
        });
    };

    let gunneryPipeline = {};
    if (unitType === 'Battery') {
        gunneryPipeline = getGunneryPipelines(batteryTables);
    } else if (unitType === 'Battalion') {
        gunneryPipeline = getGunneryPipelines(battalionTables);
    } else {
        callback('The \'Unit Type\' entry is not a valid entry');
    }

    entry.aggregate([{ $unwind: '$gunnery_table' }]).facet(gunneryPipeline)
        .then(queryResults => formatResults(queryResults[0]))
        .then(formattedResults => callback(null, formattedResults))
        .catch(err => callback(err));
};

// Returns all the questions for a gunnery table and subtask based on unit type and test type
const getAllQuestionsPerSubtask = (unitType, testType, table, subtask, callback) => {
    // Declare the existing question entry using MultChoiceQuestion model to represent 'Existing' database
    let entry = MultChoiceQuestion;

    entry.where('gunnery_table').elemMatch({'unit_type': unitType,
        'test_type': testType, 'table': table, 'subtask': subtask}).lean()
        .then(values => callback(null, values))
        .catch(err => callback(err));
};

module.exports = {
    getSampleExistingQuestionsByTables,
    getTopicCategories,
    getNumQuestionsPerSubtask,
    getAllQuestionsPerSubtask
};