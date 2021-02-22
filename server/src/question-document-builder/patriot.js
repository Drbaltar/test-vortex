const { 
    MultChoiceQuestion,
    TFQuestion,
    FillBlankQuestion, 
    PendingMultChoiceQuestion,
    PendingTFQuestion,
    PendingFillBlankQuestion
} = require('../../models/questions/patriot');

const getQuestionDocument = (status, req) => {
    switch (req.body.questionType) {
    case 'Multiple Choice':
        return buildMultChoiceQuestionDocument(status, req);
    case 'True or False':
        return buildTFQuestionDocument(status, req);
    case 'Fill-in-the-Blank':
        return buildFillBlankQuestionDocument(status, req);
    default:
        throw new Error('The \'Question Type\' entry is not a valid entry!');
    }
};

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
    try {
        return gunneryTable.map((entry) => {
            return({
                unit_type: entry.unitType,
                test_type: entry.testType,
                table: entry.table,
                subtask: entry.subtask
            });
        });
    } catch (error) {
        throw new Error('The \'Gunnery Table\' field is invalid or missing!');
    }
};

const getTopics = (topic) => {
    try {
        return {
            major_category: topic.majorCategory,
            sub_category: topic.subCategory
        };
    } catch (error) {
        throw new Error('The \'Topic\' fields are invalid or missing!');
    }

};

module.exports = {
    getQuestionDocument
};