const patriotObjectConverter = require('./patriot-question');

const testMultChoiceQuestionApp = {
    questionType: 'Multiple Choice',
    questionDescription: 'What is the acronym for Antenna Mast Group?',
    correctAnswer: 'AMG',
    answerA: 'ECS',
    answerB: 'EPP',
    answerC: 'RS',
    gunneryTable: [
        {
            unitType: 'Battery',
            testType: 'Tactics',
            table: 'I',
            subtask: 1
        },
        {
            unitType: 'Battalion',
            testType: 'RSOP',
            table: 'II',
            subtask: 2
        }
    ],
    topic: {
        majorCategory: 'AMG',
        subCategory: 'Acronym'
    }
};

const testMultChoiceQuestionDB = {
    question_type: 'Multiple Choice',
    question_description: 'What is the acronym for Antenna Mast Group?',
    correct_answer: 'AMG',
    answer_a: 'ECS',
    answer_b: 'EPP',
    answer_c: 'RS',
    gunnery_table: [
        {
            unit_type: 'Battery',
            test_type: 'Tactics',
            table: 'I',
            subtask: 1
        },
        {
            unit_type: 'Battalion',
            test_type: 'RSOP',
            table: 'II',
            subtask: 2
        }
    ],
    topic: {
        major_category: 'AMG',
        sub_category: 'Acronym'
    }
};

describe('patriot-question object converter', () => {
    describe('convertToDBSchema for patriot question', () => {
        let returnedObject;

        beforeAll(() => {
            returnedObject = patriotObjectConverter.convertToDBSchema(testMultChoiceQuestionApp);
        });

        it('returns the correct object', () => {
            expect(returnedObject).toEqual(testMultChoiceQuestionDB);
        });
    });

    describe('convertToAppSchema for patriot question', () => {
        let returnedObject;

        beforeAll(() => {
            returnedObject = patriotObjectConverter.convertToAppSchema(testMultChoiceQuestionDB);
        });

        it('returns the correct object', () => {
            expect(returnedObject).toEqual(testMultChoiceQuestionApp);
        });
    });
});