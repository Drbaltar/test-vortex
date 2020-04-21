const PatriotTestFormat = (unitType, testLevel, testType, version, date, testQuestions) => {
    let questionNumber = 1;

    let testQuestionsString = testQuestions.map((question) => {
        if (question.question_type === 'Multiple Choice') {
            return([{
                text: `${questionNumber++})\t${question.question_description}`,
                style: 'questions'
            },
            {
                text: `a) ${question.correct_answer}\n` +
                    `b) ${question.answer_a}\n` +
                    `c) ${question.answer_b}\n` +
                    `d) ${question.answer_c}\n\n`,
                style: 'answers'
            }])
        } else if (question.question_type === 'True or False') {
            return({
                text: `${questionNumber++})\tTrue or False: ${question.question_description}\n\n`,
                style: 'questions'
            })
        } else {
            return({
                text: `${questionNumber++})\t${question.question_description}\n\n`,
                style: 'questions'
            })
        }

    })

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
    })
};

export default PatriotTestFormat;