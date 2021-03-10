import React from 'react';
import { shallow } from 'enzyme';
import BaseQuestionFields from './BaseQuestionFields';

const parentState = {
    questionType: 'Multiple Choice',
    questionDescription: 'What is the acronym for the Antenna Mast Group?',
    correctAnswer: 'AMG',
    answerA: 'EPP',
    answerB: 'ECS',
    answerC: 'BCP',
    isQuestionTypeValid: false,
    isQuestionDescriptionValid: false,
    isCorrectAnswerValid: false,
    isAnswerAValid: false,
    isAnswerBValid: false,
    isAnswerCValid: false
};

const handleInputChange = jest.fn();

describe('BaseQuestionFields', () => {
    const wrapper = shallow(<BaseQuestionFields inputHandler={handleInputChange} 
        questionType={parentState.questionType} isQuestionTypeValid={parentState.isQuestionTypeValid}
        questionDescription={parentState.questionDescription} isQuestionDescriptionValid={parentState.isQuestionDescriptionValid}
        correctAnswer={parentState.correctAnswer} isCorrectAnswerValid={parentState.isCorrectAnswerValid}
        answerA={parentState.answerA} isAnswerAValid={parentState.isAnswerAValid}
        answerB={parentState.answerB} isAnswerBValid={parentState.isAnswerBValid}
        answerC={parentState.answerC} isAnswerCValid={parentState.isAnswerCValid}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    describe('Question Type Field', () => {
        const expectedOptions = ['Multiple Choice', 'Fill-in-the-Blank', 'True or False'];
        const expectedProps = { 
            label: 'Question Type',
            options: expectedOptions,
            value: parentState.questionType,
            inputChange: handleInputChange,
            isValid: parentState.isQuestionTypeValid,
            errorMessage: 'You must select the question type!'
        };

        it('renders the Question Type Field', () => {
            expect(wrapper.find('#questionType').exists()).toBe(true);
        });

        it('is an instance of a SelectBox component', () => {
            expect(wrapper.find('#questionType').is('SelectBox')).toBe(true);
        });

        it('sets the props to the correct values', () => {
            expect(wrapper.find('#questionType').props()).toMatchObject(expectedProps);
        });

        describe('when parents props change', () => {
            const fieldChanges = { questionType: 'True or False', isQuestionTypeValid: true };
            
            beforeAll(() => {
                wrapper.setProps(fieldChanges);
            });

            it('changes the value prop', () => {
                expect(wrapper.find('#questionType').prop('value')).toBe(fieldChanges.questionType);
            });

            it('changes the isValid prop', () => {
                expect(wrapper.find('#questionType').prop('isValid')).toBe(fieldChanges.isQuestionTypeValid);
            });
        });
    });

    describe('Question Description Field', () => {
        const expectedProps = { 
            label: 'Question Description',
            value: parentState.questionDescription,
            inputChange: handleInputChange,
            isValid: parentState.isQuestionDescriptionValid,
            errorMessage: 'The question description must be at least 10 characters!',
            type: 'text', rows: '4'
        };

        it('renders the Question Description Field', () => {
            expect(wrapper.find('#questionDescription').exists()).toBe(true);
        });

        it('is an instance of a TextArea component', () => {
            expect(wrapper.find('#questionDescription').is('TextArea')).toBe(true);
        });

        it('sets the props to the correct values', () => {
            expect(wrapper.find('#questionDescription').props()).toMatchObject(expectedProps);
        });

        describe('when parents props change', () => {
            const fieldChanges = { questionDescription: 'What is the ECS?', isQuestionDescriptionValid: true };
            
            beforeAll(() => {
                wrapper.setProps(fieldChanges);
            });

            it('changes the value prop', () => {
                expect(wrapper.find('#questionDescription').prop('value')).toBe(fieldChanges.questionDescription);
            });

            it('changes the isValid prop', () => {
                expect(wrapper.find('#questionDescription').prop('isValid')).toBe(fieldChanges.isQuestionDescriptionValid);
            });
        });
    });

    describe('Correct Answer Field', () => {
        it('renders the Correct Answer Field', () => {
            expect(wrapper.find('#correctAnswer').exists()).toBe(true);
        });
        describe('when the Question Type is True or False', () => {
            const expectedOptions = ['', 'True', 'False'];
            const expectedProps = { 
                label: 'Correct Answer',
                options: expectedOptions,
                value: parentState.correctAnswer,
                inputChange: handleInputChange,
                isValid: parentState.isCorrectAnswerValid,
                errorMessage: 'Please select either \'True\' or \'False\''
            };

            beforeAll(() => {
                wrapper.setProps({ questionType: 'True or False'});
            });

            it('renders a SelectBox component', () => {
                expect(wrapper.find('#correctAnswer').is('SelectBox')).toBe(true);
            });

            it('sets the props to the correct values', () => {
                expect(wrapper.find('#correctAnswer').props()).toMatchObject(expectedProps);
            });

            describe('when parents props change', () => {
                const fieldChanges = { correctAnswer: 'False', isCorrectAnswerValid: true };
                
                beforeAll(() => {
                    wrapper.setProps(fieldChanges);
                });
    
                it('changes the value prop', () => {
                    expect(wrapper.find('#correctAnswer').prop('value')).toBe(fieldChanges.correctAnswer);
                });
    
                it('changes the isValid prop', () => {
                    expect(wrapper.find('#correctAnswer').prop('isValid')).toBe(fieldChanges.isCorrectAnswerValid);
                });

                afterAll(() => {
                    wrapper.setProps({ correctAnswer: parentState.correctAnswer, isCorrectAnswerValid: parentState.isCorrectAnswerValid });
                });
            });
        });

        describe('when the Question Type is Multiple Choice or Fill-in-the-Blank', () => {
            const expectedProps = { 
                label: 'Correct Answer',
                type: 'text',
                value: parentState.correctAnswer,
                inputChange: handleInputChange,
                isValid: parentState.isCorrectAnswerValid,
                errorMessage: 'The \'Correct Answer\' field is required!'
            };
            
            beforeAll(() => {
                wrapper.setProps({ questionType: 'Multiple Choice'});
            });

            it('renders a TextField component', () => {
                expect(wrapper.find('#correctAnswer').is('TextField')).toBe(true);
            });

            it('sets the props to the correct values', () => {
                expect(wrapper.find('#correctAnswer').props()).toMatchObject(expectedProps);
            });

            describe('when parents props change', () => {
                const fieldChanges = { correctAnswer: 'False', isCorrectAnswerValid: true };
                
                beforeAll(() => {
                    wrapper.setProps(fieldChanges);
                });
    
                it('changes the value prop', () => {
                    expect(wrapper.find('#correctAnswer').prop('value')).toBe(fieldChanges.correctAnswer);
                });
    
                it('changes the isValid prop', () => {
                    expect(wrapper.find('#correctAnswer').prop('isValid')).toBe(fieldChanges.isCorrectAnswerValid);
                });

                afterAll(() => {
                    wrapper.setProps({ correctAnswer: parentState.correctAnswer, isCorrectAnswerValid: parentState.isCorrectAnswerValid });
                });
            });
        });
    });

    describe('Multiple Choice Answers', () => {
        describe('Answer A Field', () => {
            const expectedProps = { 
                label: 'Answer A',
                type: 'text',
                value: parentState.answerA,
                inputChange: handleInputChange,
                isValid: parentState.isAnswerAValid,
                errorMessage: 'The \'Answer A\' field is required!'
            };

            it('renders the Answer A Field', () => {
                expect(wrapper.find('#answerA').exists()).toBe(true);
            });

            it('renders as a TextField component', () => {
                expect(wrapper.find('#answerA').is('TextField')).toBe(true);
            });

            it('passes the correct props', () => {
                expect(wrapper.find('#answerA').props()).toMatchObject(expectedProps);
            });
        });

        describe('Answer B Field', () => {
            const expectedProps = { 
                label: 'Answer B',
                type: 'text',
                value: parentState.answerB,
                inputChange: handleInputChange,
                isValid: parentState.isAnswerBValid,
                errorMessage: 'The \'Answer B\' field is required!'
            };

            it('renders the Answer B Field', () => {
                expect(wrapper.find('#answerB').exists()).toBe(true);
            });

            it('renders as a TextField component', () => {
                expect(wrapper.find('#answerB').is('TextField')).toBe(true);
            });

            it('passes the correct props', () => {
                expect(wrapper.find('#answerB').props()).toMatchObject(expectedProps);
            });
        });

        describe('Answer C Field', () => {
            const expectedProps = { 
                label: 'Answer C',
                type: 'text',
                value: parentState.answerC,
                inputChange: handleInputChange,
                isValid: parentState.isAnswerCValid,
                errorMessage: 'The \'Answer C\' field is required!'
            };

            it('renders the Answer C Field', () => {
                expect(wrapper.find('#answerC').exists()).toBe(true);
            });

            it('renders as a TextField component', () => {
                expect(wrapper.find('#answerC').is('TextField')).toBe(true);
            });

            it('passes the correct props', () => {
                expect(wrapper.find('#answerC').props()).toMatchObject(expectedProps);
            });
        });

        describe('when parents props change for any alternate answer fields', () => {
            const fieldChanges = { answerA: 'ICC', isAnswerAValid: true };
            
            beforeAll(() => {
                wrapper.setProps(fieldChanges);
            });

            it('changes the value prop', () => {
                expect(wrapper.find('#answerA').prop('value')).toBe(fieldChanges.answerA);
            });

            it('changes the isValid prop', () => {
                expect(wrapper.find('#answerA').prop('isValid')).toBe(fieldChanges.isAnswerAValid);
            });

            afterAll(() => {
                wrapper.setProps({ answerA: parentState.answerA, isAnswerAValid: parentState.isAnswerAValid });
            });
        });
    });

    describe('when question type is changed to Fill-in-the-Blank', () => {
        beforeAll(() => {
            wrapper.setProps({ questionType: 'Fill-in-the-Blank' });
        });
        
        it('does not render the alternate answers', () => {
            expect(wrapper.find('#answerA').exists()).toBe(false);
            expect(wrapper.find('#answerB').exists()).toBe(false);
            expect(wrapper.find('#answerC').exists()).toBe(false);

        });

        afterAll(() => {
            wrapper.setProps({ questionType: parentState.questionType });
        });
    });
});
