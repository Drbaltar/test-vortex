// const Issue = require('../models/issue');
const MultQuestion = require('../models/patriot/mult-question');
const TFQuestion = require('../models/patriot/tf-question');
const FillBlankQuestion = require('../models/patriot/fill-blank-question');


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

module.exports = {
    getAllPendingQuestions,
    getPendingQuestion,
    deletePendingQuestion
};