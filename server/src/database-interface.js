// const Issue = require('../models/issue');
const MultQuestion = require('../models/patriot/mult-question');
// const TFQuestion = require('../models/patriot/tf-question');
// const FillBlankQuestion = require('../models/patriot/fill-blank-question');


// Returns the entire collection of pending questions
const getAllPendingQuestions = (callback) => {
    // Use the MultQuestion model to query for the pending questions, but the 
    // result will include all 'True or False' and 'Fill-in-the-Blank' as well
    MultQuestion.PendingMultQuestion.find().exec((err, response) => {
        callback(err, response);
    });
};

module.exports = {
    getAllPendingQuestions
};