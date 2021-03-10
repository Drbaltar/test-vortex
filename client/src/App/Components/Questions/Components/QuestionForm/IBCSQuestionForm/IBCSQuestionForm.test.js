import React from 'react';
import { shallow } from 'enzyme';
import IBCSQuestionForm from './IBCSQuestionForm';

const baseQuestionFieldValues = {
    questionType: 'Multiple Choice',
    questionDescription: '',
    correctAnswer: '',
    answerA: '',
    answerB: '',
    answerC: ''
};

const baseQuestionFieldValidity = {
    isQuestionTypeValid: null,
    isQuestionDescriptionValid: null,
    isCorrectAnswerValid: null,
    isAnswerAValid: null,
    isAnswerBValid: null,
    isAnswerCValid: null
};

const expectedInitialState = {
    ...baseQuestionFieldValues,
    topic: {
        majorCategory: '',
        subCategory: ''
    },
    inputValidity: {
        ...baseQuestionFieldValidity,
        isTestTypeValid: null,
        isMajorTopicValid: null,
        isSubTopicValid: null
    },
    isTopicLoading: false,
    existingTopicCategories: null
};

describe('IBCSQuestionForm', () => {
    const wrapper = shallow(<IBCSQuestionForm title='Add New IBCS Question'/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets the state to the correct initial state', () => {
        expect(wrapper.state()).toEqual(expectedInitialState);
    });

    it('renders the BodyCard component', () => {
        expect(wrapper.find('BodyCard').exists()).toBe(true);
    });

    it('passes the title prop to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').prop('title')).toBe('Add New IBCS Question');
    });

    it('renders the BaseQuestionFields component', () => {
        expect(wrapper.find('BaseQuestionFields').exists()).toBe(true);
    });

    it('passes the correct prop values to the BaseQuestionFields component', () => {
        expect(wrapper.find('BaseQuestionFields').props()).toMatchObject({...baseQuestionFieldValues, ...baseQuestionFieldValidity});
    });

    it('passes the input handler function to the BaseQuestionFields component', () => {
        expect(wrapper.find('BaseQuestionFields').prop('inputHandler')).toBeInstanceOf(Function);
    });

    describe('when the question type field changes', () => {
        beforeAll(() => {
            wrapper.setState({ correctAnswer: 'ECS', answerA: 'ECS', answerB: 'EPP', answerC: 'BCP' });

            const inputHandler = wrapper.find('BaseQuestionFields').prop('inputHandler');
            inputHandler({ target: { id: 'questionType', value: 'Fill-in-the-Blank'}});
        });

        it('sets the correctAnswer to blank', () => {
            expect(wrapper.state().correctAnswer).toBe('');
        });

        it('sets the alternate answers to blank', () => {
            expect(wrapper.state().answerA).toBe('');
            expect(wrapper.state().answerB).toBe('');
            expect(wrapper.state().answerC).toBe('');
        });

        afterAll(() => {
            wrapper.setState({
                questionType: baseQuestionFieldValues.questionType,
                correctAnswer: baseQuestionFieldValues.correctAnswer,
                answerA: baseQuestionFieldValues.answerA,
                answerB: baseQuestionFieldValues.answerB,
                answerC: baseQuestionFieldValues.answerC
            });
        });
    });
});