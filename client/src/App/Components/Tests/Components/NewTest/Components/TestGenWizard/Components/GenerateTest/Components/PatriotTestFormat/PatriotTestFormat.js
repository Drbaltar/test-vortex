const PatriotTestFormat = (unitType, testLevel, testType, version, date, testQuestions, versionOutline) => {
    
    let testQuestionsString = versionOutline.questions.map((questionOutline, index) => {
        const question = testQuestions.find((question) => question._id === questionOutline.question_id);

        if (question.question_type === 'Multiple Choice') {
            return([{
                text: `${index + 1})\t${question.question_description}`,
                style: 'questions'
            },
            {
                text: `a) ${question[questionOutline.answer_order[0]]}\n` +
                    `b) ${question[questionOutline.answer_order[1]]}\n` +
                    `c) ${question[questionOutline.answer_order[2]]}\n` +
                    `d) ${question[questionOutline.answer_order[3]]}\n\n`,
                style: 'answers'
            }]);
        } else if (question.question_type === 'True or False') {
            return({
                text: `${index + 1})\tTrue or False: ${question.question_description}\n\n`,
                style: 'questions'
            });
        } else {
            return({
                text: `${index + 1})\t${question.question_description}\n\n`,
                style: 'questions'
            });
        }

    });

    return ({
        content: [
            {
                text: `\n\n\n\n${testLevel} Exam
                    \n${testType}
                    (${unitType})
                    \n\n\n\n\n${testType === 'Early Warning/Mission Command' ? '' : '\n'}`,
                style: 'titlePageHeader'
            },
            {
                text: `Version ${version || 'A'}\nCreated on ${date || '17APR20'}`,
                style: 'titlePageInfo'
            },
            testQuestionsString
        ],

        styles: {
            titlePageHeader: {
                fontSize: 42,
                bold: true,
                alignment: 'center'
            },
            titlePageInfo: {
                fontSize: 14,
                bold: true,
                alignment: 'center'
            },
            questions: {
                fontSize: 14
            },
            answers: {
                fontSize: 14,
                margin: [26, 8, 0, 0]
            }
        },

        pageMargins: 60
    });
};

export default PatriotTestFormat;