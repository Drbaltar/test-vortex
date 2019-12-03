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

// Returns the appropriate document for the entry id passed in
const getPendingQuestion = (data, callback) => {
    // Declare the pending question entry
    let entry;

    // Find out what type of question is being submitted and build appropriate document
    switch (data.questionType) {
    case 'Multiple Choice':
        entry = new MultQuestion.PendingMultQuestion;
        break;
    case 'True or False':
        entry = new TFQuestion.PendingTFQuestion;
        break;
    case 'Fill-in-the-Blank':
        entry = new FillBlankQuestion.PendingFillBlankQuestion;
        break;
    default:
        callback (null, 'The \'Question Type\' entry is not a valid entry');
        return;
    }

    entry.findById(data._id, (err, doc) => {
        callback(err, doc);
    });
};

module.exports = {
    getAllPendingQuestions,
    getPendingQuestion
};