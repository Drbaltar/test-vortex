const convertToDBSchema = (object) => {
    if (object.questionType === 'Multiple Choice') {
        return {
            ...convertQuestionInfoToDBSchema(object),
            ...convertAltAnswersToDBSchema(object)
        };
    } else {
        return {
            ...convertQuestionInfoToDBSchema(object)
        };
    }
};

const convertQuestionInfoToDBSchema = (object) => {
    return {
        question_type: object.questionType,
        question_description: object.questionDescription,
        correct_answer: object.correctAnswer,
    };
};

const convertAltAnswersToDBSchema = (object) => {
    return {
        answer_a: object.answerA,
        answer_b: object.answerB,
        answer_c: object.answerC
    };
};

const convertToAppSchema = (object) => {
    if (object.question_type === 'Multiple Choice') {
        return {
            ...convertQuestionInfoToAppSchema(object),
            ...convertAltAnswersToAppSchema(object)
        };
    } else {
        return {
            ...convertQuestionInfoToAppSchema(object)
        };
    }
};

const convertQuestionInfoToAppSchema = (object) => {
    return {
        questionType: object.question_type,
        questionDescription: object.question_description,
        correctAnswer: object.correct_answer,
    };
};

const convertAltAnswersToAppSchema = (object) => {
    return {
        answerA: object.answer_a,
        answerB: object.answer_b,
        answerC: object.answer_c
    };
};

module.exports = {
    convertToDBSchema,
    convertToAppSchema
};