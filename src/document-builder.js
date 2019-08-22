const Issue = require('../models/issue');
const MultQuestion = require('../models/patriot/mult-question');
const TFQuestion = require('../models/patriot/tf-question');

const buildIssueDocument = (req) => {
    return new Issue({
        question_id: req.body.questionID,
        issue_type: req.body.issueType,
        issue_description: req.body.issueDescription
    });
};

const buildMultQuestionDocument = (status, req) => {
    let inputData = {
        question_type: req.body.questionType,
        question_description: req.body.questionDescription,
        answer_a: req.body.answerA,
        answer_b: req.body.answerB,
        answer_c: req.body.answerC,
        correct_answer: req.body.correctAnswer,
        gunnery_table: req.body.gunneryTable,
        test_type: req.body.testType,
        topic: req.body.topic,
        reference: req.body.reference
    };

    if (status === 'pending') {
        return new MultQuestion.PendingMultQuestion(inputData); 
    } else if (status === 'approved') {
        return new MultQuestion.MultQuestion(inputData); 
    } else {
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
    }
};

const buildTFQuestionDocument = (status, req) => {
    let inputData = {
        question_type: req.body.questionType,
        question_description: req.body.questionDescription,
        answer_a: req.body.answerA,
        answer_b: req.body.answerB,
        answer_c: req.body.answerC,
        correct_answer: req.body.correctAnswer,
        gunnery_table: req.body.gunneryTable,
        test_type: req.body.testType,
        topic: req.body.topic,
        reference: req.body.reference
    };

    if (status === 'pending') {
        return new TFQuestion.PendingTFQuestion(inputData); 
    } else if (status === 'approved') {
        return new TFQuestion.TFQuestion(inputData); 
    } else {
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
    }
};

module.exports = {
    buildIssueDocument,
    buildMultQuestionDocument,
    buildTFQuestionDocument
};