const MultQuestion = require('../models/patriot/mult-question');
const TFQuestion = require('../models/patriot/tf-question');
const FillBlankQuestion = require('../models/patriot/fill-blank-question');

/*------------------------CRUD Operations for 'Pending' Database-----------------------*/

// Returns the entire collection of pending questions
const getAllPendingQuestions = (callback) => {
    // Use the MultQuestion model to query for the pending questions, but the 
    // result will include all 'True or False' and 'Fill-in-the-Blank' as well
    MultQuestion.PendingMultQuestion.find().exec((err, response) => {
        callback(err, response);
    });
};

// Returns the appropriate document for the entry ID and question type passed in
const getPendingQuestion = (id, questionType, callback) => {
    // Declare the pending question entry
    let entry;

    // Find out what type of question is being submitted and build appropriate document
    switch (questionType) {
    case 'Multiple Choice':
        entry = MultQuestion.PendingMultQuestion;
        break;
    case 'True or False':
        entry = TFQuestion.PendingTFQuestion;
        break;
    case 'Fill-in-the-Blank':
        entry = FillBlankQuestion.PendingFillBlankQuestion;
        break;
    default:
        callback (null, 'The \'Question Type\' entry is not a valid entry');
        return;
    }

    entry.findById(id, (err, doc) => {
        callback(err, doc);
    });
};

// Deletes the pending question entry based on the passed in ID
const deletePendingQuestion = (id, callback) => {
    // Use the MultQuestion model to query for the pending questions, but the 
    // result will include all 'True or False' and 'Fill-in-the-Blank' as well
    MultQuestion.PendingMultQuestion.findByIdAndDelete(id, (err, response) => {
        callback(err, response);
    });
};

/*------------------------CRUD Operations for 'Existing' Database-----------------------*/

// Returns the appropriate document for the entry ID passed in
const getExistingQuestion = (id, callback) => {
    // Declare the existing question entry using MultQuestion model to represent 'Existing' database
    let entry = MultQuestion.MultQuestion;

    entry.findById(id, (err, doc) => {
        callback(err, doc);
    });
};

// Returns the appropriate questions based on the passed in unit and test type
const getExistingQuestionsByCategory = (unitType, testType, callback) => {
    // Declare the existing question entry using MultQuestion model to represent 'Existing' database
    let entry = MultQuestion.MultQuestion;

    entry.find({'gunnery_table.unit_type': unitType, 
        'gunnery_table.test_type': testType}, (err, doc) => {
        callback(err, doc);
    });
};

// Returns the appropriate document for the entry ID passed in
const getExistingQuestionForUpdate = (id, questionType, callback) => {
    // Declare the existing question entry using MultQuestion model to represent 'Existing' database
    let entry;

    // Find out what type of question is being submitted and build appropriate document
    switch (questionType) {
    case 'Multiple Choice':
        entry = MultQuestion.MultQuestion;
        break;
    case 'True or False':
        entry = TFQuestion.TFQuestion;
        break;
    case 'Fill-in-the-Blank':
        entry = FillBlankQuestion.FillBlankQuestion;
        break;
    default:
        callback (null, 'The \'Question Type\' entry is not a valid entry');
        return;
    }

    entry.findById(id, (err, doc) => {
        callback(err, doc);
    });
};

// Deletes the entry based on the input Question ID
const deleteExistingQuestion = (id, callback) => {
    // Declare the existing question entry using MultQuestion model to represent 'Existing' database
    let entry = MultQuestion.MultQuestion;

    entry.findByIdAndRemove(id, (err, doc) => {
        callback(err, doc);
    });
};

/*------------------------Operations for Requesting Topic Categories-----------------------*/

// Returns an array of topic categories based on the input gunnery table and subtask
const getTopicCategories = (unitType, table, subtask, callback) => {
    // Declare the existing question entry using MultQuestion model to represent 'Existing' database
    let entry = MultQuestion.MultQuestion;

    entry.find({'gunnery_table.unit_type': unitType, 'gunnery_table.table': table, 
        'gunnery_table.subtask': subtask}, (err, doc) => {
        callback(err, doc);
    });
};

module.exports = {
    getAllPendingQuestions,
    getPendingQuestion,
    deletePendingQuestion,
    getExistingQuestion,
    getExistingQuestionsByCategory,
    getExistingQuestionForUpdate,
    deleteExistingQuestion,
    getTopicCategories
};