const baseQuestionConverter = require('./base-question');

const testMultChoiceQuestionApp = {
    questionType: 'Multiple Choice',
    questionDescription: 'What is the best movie?',
    correctAnswer: 'Inception',
    answerA: 'Dark Knight',
    answerB: 'Tenet',
    answerC: 'Dunkirk'
};

const testMultChoiceQuestionDB = {
    question_type: 'Multiple Choice',
    question_description: 'What is the best movie?',
    correct_answer: 'Inception',
    answer_a: 'Dark Knight',
    answer_b: 'Tenet',
    answer_c: 'Dunkirk'
};

const testTFQuestionApp = {
    questionType: 'True or False',
    questionDescription: 'Inception is the best movie.',
    correctAnswer: 'True'
};

const testTFQuestionDB = {
    question_type: 'True or False',
    question_description: 'Inception is the best movie.',
    correct_answer: 'True'
};

describe('base-question object converter', () => {
    describe('convertToDBSchema for multiple choice question', () => {
        let returnedObject;
        
        beforeAll(() => {
            returnedObject = baseQuestionConverter.convertToDBSchema(testMultChoiceQuestionApp);  
        });

        it('returns the correct obect format', () => {
            expect(returnedObject).toEqual(testMultChoiceQuestionDB);
        });
    });

    describe('convertToDBSchema for true or false questions', () => {
        let returnedObject;

        beforeAll(() => {
            returnedObject = baseQuestionConverter.convertToDBSchema(testTFQuestionApp);
        });

        it('returns the correct obect format', () => {
            expect(returnedObject).toEqual(testTFQuestionDB);
        });
    });

    describe('convertToAppSchema for multiple choice questions', () => {
        let returnedObject;

        beforeAll(() => {
            returnedObject = baseQuestionConverter.convertToAppSchema(testMultChoiceQuestionDB);  
        });

        it('returns the correct obect format', () => {
            expect(returnedObject).toEqual(testMultChoiceQuestionApp);
        }); 
    });

    describe('convertToAppSchema for true or false questions', () => {
        let returnedObject;

        beforeAll(() => {
            returnedObject = baseQuestionConverter.convertToAppSchema(testTFQuestionDB);  
        });

        it('returns the correct obect format', () => {
            expect(returnedObject).toEqual(testTFQuestionApp);
        }); 
    });
});