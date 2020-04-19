const PatriotTestFormat = (testLevel, testType, version, date) => {
    return ({
        content: [
            {
                text: `\n\n\n\n${testLevel} Exam\n\n${testType}\n\n\n\n\n\n\n${testType === 'Early Warning/Mission Command' ? '' : '\n'}`,
                style: 'titlePageHeader'
            },
            {
                text: `Version ${version || 'A'}\nCreated on ${date || '17APR20'}`,
                style: 'titlePageInfo'
            }
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
        }

    })
};

export default PatriotTestFormat;