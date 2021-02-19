const { 
    MultChoiceQuestion,
    TFQuestion,
    FillBlankQuestion, 
    PendingMultChoiceQuestion,
    PendingTFQuestion,
    PendingFillBlankQuestion
} = require('../../models/questions/patriot');

const buildMultChoiceQuestionDocument = (status, req) => {
    const data = req.body;

    let inputData = {
        ...getInputData(data),
        answer_a: data.answerA,
        answer_b: data.answerB,
        answer_c: data.answerC
    };

    if (status === 'pending') {
        return new PendingMultChoiceQuestion(inputData); 
    } else if (status === 'approved') {
        return new MultChoiceQuestion(inputData); 
    } else {
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
    }
};

const buildTFQuestionDocument = (status, req) => {
    let inputData = getInputData(req.body);

    if (status === 'pending') {
        return new PendingTFQuestion(inputData); 
    } else if (status === 'approved') {
        return new TFQuestion(inputData); 
    } else {
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
    }
};

const buildFillBlankQuestionDocument = (status, req) => {
    let inputData = getInputData(req.body);

    if (status === 'pending') {
        return new PendingFillBlankQuestion(inputData); 
    } else if (status === 'approved') {
        return new FillBlankQuestion(inputData); 
    } else {
        throw new Error('The input status must be either \'pending\' or \'approved\'.');
    }
};

const getInputData = (data) => {
    return {
        question_type: data.questionType,
        question_description: data.questionDescription,
        correct_answer: data.correctAnswer,
        gunnery_table: getGunneryTableEntries(data.gunneryTable),
        topic: getTopics(data.topic)
    };
};

const getGunneryTableEntries = (gunneryTable) => {
    return gunneryTable.map((entry) => {
        return({
            unit_type: entry.unitType,
            test_type: entry.testType,
            table: entry.table,
            subtask: entry.subtask
        });
    });
};

const getTopics = (topic) => {
    return {
        major_category: topic.majorCategory,
        sub_category: topic.subCategory
    };
};

module.exports = {
    buildMultChoiceQuestionDocument,
    buildTFQuestionDocument,
    buildFillBlankQuestionDocument
};