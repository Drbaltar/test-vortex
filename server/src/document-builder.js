const MultQuestion = require('../models/patriot/mult-question');
const TFQuestion = require('../models/patriot/tf-question');
const FillBlankQuestion = require('../models/patriot/fill-blank-question');

const buildMultQuestionDocument = (status, req) => {
    const gunneryTableEntries = req.body.gunneryTable.map((entry) => {
        return({
            unit_type: entry.unitType,
            test_type: entry.testType,
            table: entry.table,
            subtask: entry.subtask
        });
    });

    let inputData = {
        question_type: req.body.questionType,
        question_description: req.body.questionDescription,
        answer_a: req.body.answerA,
        answer_b: req.body.answerB,
        answer_c: req.body.answerC,
        correct_answer: req.body.correctAnswer,
        gunnery_table: gunneryTableEntries,
        topic: {
            major_category: req.body.topic.majorCategory,
            sub_category: req.body.topic.subCategory
        }
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
    const gunneryTableEntries = req.body.gunneryTable.map((entry) => {
        return({
            unit_type: entry.unitType,
            test_type: entry.testType,
            table: entry.table,
            subtask: entry.subtask
        });
    });

    let inputData = {
        question_type: req.body.questionType,
        question_description: req.body.questionDescription,
        correct_answer: req.body.correctAnswer,
        gunnery_table: gunneryTableEntries,
        topic: {
            major_category: req.body.topic.majorCategory,
            sub_category: req.body.topic.subCategory
        }
    };

    if (status === 'pending') {
        return new TFQuestion.PendingTFQuestion(inputData); 
    } else if (status === 'approved') {
        return new TFQuestion.TFQuestion(inputData); 
    } else {
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
    }
};

const buildFillBlankQuestionDocument = (status, req) => {
    const gunneryTableEntries = req.body.gunneryTable.map((entry) => {
        return({
            unit_type: entry.unitType,
            test_type: entry.testType,
            table: entry.table,
            subtask: entry.subtask
        });
    });

    let inputData = {
        question_type: req.body.questionType,
        question_description: req.body.questionDescription,
        correct_answer: req.body.correctAnswer,
        gunnery_table: gunneryTableEntries,
        topic: {
            major_category: req.body.topic.majorCategory,
            sub_category: req.body.topic.subCategory
        }
    };

    if (status === 'pending') {
        return new FillBlankQuestion.PendingFillBlankQuestion(inputData); 
    } else if (status === 'approved') {
        return new FillBlankQuestion.FillBlankQuestion(inputData); 
    } else {
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
    }
};

module.exports = {
    buildMultQuestionDocument,
    buildTFQuestionDocument,
    buildFillBlankQuestionDocument
};