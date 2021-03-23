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

const invalidBaseQuestionFieldValidity = {
    isQuestionTypeValid: true,
    isQuestionDescriptionValid: false,
    isCorrectAnswerValid: false,
    isAnswerAValid: false,
    isAnswerBValid: false,
    isAnswerCValid: false
};

const expectedInitialState = {
    ...baseQuestionFieldValues,
    testType: {
        tactics: false,
        earlyWarning: false,
        weaponsControl: false
    },
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

const stateWithValidMultChoiceFields = {
    questionType: 'True or False',
    questionDescription: 'What is my name?',
    correctAnswer: 'Kyle',
    answerA: 'Troy',
    answerB: 'Gavin',
    answerC: 'Mark',
    testType: {
        tactics: false,
        earlyWarning: true,
        weaponsControl: false
    },
    topic: {
        majorCategory: 'Test',
        subCategory: 'Categories'
    }
};

class TestFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

const mockPreventDefault = jest.fn();
const mockClearErrorMessage = jest.fn();
const mockSubmit = jest.fn();

describe('IBCSQuestionForm', () => {
    const wrapper = shallow(<IBCSQuestionForm title='Add New IBCS Question' submit={mockSubmit} clearErrorMessage={mockClearErrorMessage}>
        <TestFooter />
    </IBCSQuestionForm>);

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

    it('renders the CheckBoxGroup component', () => {
        expect(wrapper.find('CheckBoxGroup').exists()).toBe(true);
    });

    it('passes the correct props to the CheckBoxGroup', () => {
        expect(wrapper.find('CheckBoxGroup').props()).toEqual({
            heading: 'Please select the tests for which this question is applicable:',
            boxGroup: [
                {
                    id: 'tactics',
                    label: 'Tactics',
                    value: false
                },
                {
                    id: 'earlyWarning',
                    label: 'Early Warning',
                    value: false
                },
                {
                    id: 'weaponsControl',
                    label: 'Weapons Control',
                    value: false
                }
            ],
            checkboxChange: expect.any(Function),
            isValid: expectedInitialState.inputValidity.isTestTypeValid,
            errorMessage: 'At least one \'Test Type\' must be selected!'
        });
    });

    describe('when each test type checkbox has been selected', () => {
        const checkboxChange = wrapper.find('CheckBoxGroup').prop('checkboxChange');
        
        it('changes the tactics variable in state', () => {
            checkboxChange({ target: { id: 'tactics', checked: true }});

            expect(wrapper.state().testType.tactics).toBe(true);
        });

        it('changes the earlyWarning variable in state', () => {
            checkboxChange({ target: { id: 'earlyWarning', checked: true }});

            expect(wrapper.state().testType.earlyWarning).toBe(true);
        });

        it('changes the weaponsControl variable in state', () => {
            checkboxChange({ target: { id: 'weaponsControl', checked: true }});

            expect(wrapper.state().testType.weaponsControl).toBe(true);
        });

        afterAll(() => {
            wrapper.setState({ testType: expectedInitialState.testType });
        });
    });

    it('passes the footer component to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').childAt(1).name()).toEqual('TestFooter');
    });

    it('passes the correct props to the FormFooter component', () => {
        const expectedProps = {
            clickHandler: expect.any(Function),
            cancelButtonText: 'Clear All',
            cancelButtonID: 'clearAllButton'
        };
    
        expect(wrapper.find('TestFooter').props()).toEqual(expectedProps);
    });

    describe('when the click handler is called from the Form Footer', () => {
        describe('when the clearAllButton is clicked', () => {
            beforeAll(() => {
                const clickhandler = wrapper.find('TestFooter').prop('clickHandler');

                wrapper.setState(stateWithValidMultChoiceFields, () => clickhandler({
                    target: { id: 'clearAllButton'},
                    preventDefault: mockPreventDefault
                }));
            });

            it('prevents default behavior', () => {
                expect(mockPreventDefault).toHaveBeenCalled();
            });

            it('calls the clearErrorMessage prop', () => {
                expect(mockClearErrorMessage).toHaveBeenCalled();
            });

            it('sets the state back to the initial value', () => {
                expect(wrapper.state()).toEqual(expectedInitialState);
            });

            afterAll(() => {
                mockPreventDefault.mockClear();
                mockClearErrorMessage.mockClear();
            });
        });

        describe('when any other button is clicked and all fields are valid', () => {
            beforeAll(() => {
                wrapper.setState(stateWithValidMultChoiceFields);
                const clickhandler = wrapper.find('TestFooter').prop('clickHandler');

                clickhandler({
                    target: { id: 'submitButton'},
                    preventDefault: mockPreventDefault
                });
            });

            it('prevents default behavior', () => {
                expect(mockPreventDefault).toHaveBeenCalled();
            });

            it('calls the submit prop with the button id', () => {
                expect(mockSubmit).toHaveBeenCalledWith('submitButton');
            });

            afterAll(() => {
                mockPreventDefault.mockClear();
                mockSubmit.mockClear();
                wrapper.setState(expectedInitialState);
            });
        });

        describe('when any other button is clicked and all fields are NOT valid', () => {
            beforeAll(() => {
                const clickhandler = wrapper.find('TestFooter').prop('clickHandler');

                clickhandler({
                    target: { id: 'submitButton'},
                    preventDefault: mockPreventDefault
                });
            });

            it('prevents default behavior', () => {
                expect(mockPreventDefault).toHaveBeenCalled();
            });

            it('does not call the submit prop', () => {
                expect(mockSubmit).not.toHaveBeenCalled();
            });

            it('passes the correct prop to the BaseQuestionFields component', () => {
                expect(wrapper.find('BaseQuestionFields').props()).toMatchObject(invalidBaseQuestionFieldValidity);
            });

            it('passes the correct prop to the CheckBoxGroup', () => {
                expect(wrapper.find('CheckBoxGroup').prop('isValid')).toBe(false);
            });

            afterAll(() => {
                mockSubmit.mockClear();
                mockPreventDefault.mockClear();
            });
        });

        describe('when an error message is passed in, it is displayed', () => {
            const testErrorMessage = 'There was an error when submitting';

            beforeAll(() => {
                wrapper.setProps({ errorMessage: testErrorMessage });
            });

            it('renders an ErrorMessage component', () => {
                expect(wrapper.find('ErrorMessage').exists()).toBe(true);
            });

            it('passes the error message to the ErrorMessage component', () => {
                expect(wrapper.find('ErrorMessage').prop('message')).toBe(testErrorMessage);
            }); 
        });
    });
});