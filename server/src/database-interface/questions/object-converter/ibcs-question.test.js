const ibcsObjectConverter = require('./ibcs-question');

const testMultChoiceQuestionApp = {
    questionType: 'Multiple Choice',
    questionDescription: 'What is the acronym for Antenna Mast Group?',
    correctAnswer: 'AMG',
    answerA: 'ECS',
    answerB: 'EPP',
    answerC: 'RS',
    testType: 'Tactics',
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
    test_type: 'Tactics',
    topic: {
        major_category: 'AMG',
        sub_category: 'Acronym'
    }
};

describe('ibcs-question object converter', () => {
    describe('convertToDBSchema for ibcs question', () => {
        let returnedObject;

        beforeAll(() => {
            returnedObject = ibcsObjectConverter.convertToDBSchema(testMultChoiceQuestionApp);
        });

        it('returns the correct object', () => {
            expect(returnedObject).toEqual(testMultChoiceQuestionDB);
        });
    });

    describe('convertToAppSchema for ibcs question', () => {
        let returnedObject;

        beforeAll(() => {
            returnedObject = ibcsObjectConverter.convertToAppSchema(testMultChoiceQuestionDB);
        });

        it('returns the correct object', () => {
            expect(returnedObject).toEqual(testMultChoiceQuestionApp);
        });
    });
});
