const getBaseQuestionProperties = (questionType) => {
    return {
        question_type: getQuestionType(questionType),
        question_description: getQuestionDescription(),
        correct_answer: getCorrectAnswer(questionType)
    };
};

const getQuestionType = (questionType) => {
    return {
        type: String,
        required: 'The \'Question Type\' field is required',
        default: questionType
    };
};

const getQuestionDescription = () => {
    return {
        type: String,
        required: 'The \'Question Description\' field is required',
        minlength: 10
    };
};

const getCorrectAnswer = (questionType) => {
    let correctAnswer = {
        type: String,
        required: 'The \'Correct Answer\' field is required'
    };

    if (questionType === 'True or False') {
        correctAnswer.enum = ['True', 'False'];
    }

    return correctAnswer;
};

const fillBlankQuestion = getBaseQuestionProperties('Fill-in-the-Blank');
const tfQuestion = getBaseQuestionProperties('True or False');
const multChoiceQuestion = {
    ...getBaseQuestionProperties('Multiple Choice'),
    answer_a: {
        type: String,
        required: 'The \'Answer A\' field is required'
    },
    answer_b: {
        type: String,
        required: 'The \'Answer B\' field is required'
    },
    answer_c: {
        type: String,
        required: 'The \'Answer C\' field is required'
    }
};

module.exports = {
    fillBlankQuestion,
    multChoiceQuestion,
    tfQuestion
};