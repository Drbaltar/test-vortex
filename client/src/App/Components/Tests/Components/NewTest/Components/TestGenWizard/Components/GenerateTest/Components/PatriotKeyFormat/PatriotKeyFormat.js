const PatriotKeyFormat = (unitType, testLevel, testType, version, date, testQuestions, versionOutline) => {

    const testAnswers = versionOutline.questions.map((questionOutline, index) => {
        const question = testQuestions.find((question) => question._id === questionOutline.question);

        if (question.question_type === 'Multiple Choice') {
            const correctAnswer = String.fromCharCode(65 + questionOutline.answer_order.indexOf(('correct_answer')));

            return (`${index + 1})  ${correctAnswer}`);
        } else {
            return (`${index + 1})  ${question.correct_answer}`);
        }
    });

    const numOfTables = Math.ceil(testAnswers.length / 50);

    let formattedAnswers = [];

    for (let i = 0; i < numOfTables; i++) {
        let tableAnswers = [];
        for (let j = 0; j < 25; j++) {

            tableAnswers.push([j + (i * 50) < testAnswers.length ? testAnswers[j + (i * 50)] : '',
                j + (i * 50) + 25 < testAnswers.length ? testAnswers[j + (i * 50) + 25] : '']);
        }

        formattedAnswers.push(
            {
                pageBreak: 'before',
                table: {
                    heights: 24,
                    widths: ['*', '*'],
                    body: tableAnswers
                }
            }
        );
    }

    return ({
        content: [
            {
                text: `\n\n\n\n${testLevel} Answer Key
                    \n${testType}
                    (${unitType})
                    \n\n\n\n\n${testType === 'Early Warning/Mission Command' ? '' : '\n'}`,
                style: 'titlePageHeader',
                margin: [30, 30, 30, 0]
            },
            {
                text: `Version ${version || 'A'}\nCreated on ${date || '17APR20'}`,
                style: 'titlePageInfo',
                margin: [30, 0, 30, 30]
            },
            formattedAnswers
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
            }
        },

        pageMargins: 30
    });
};

export default PatriotKeyFormat;