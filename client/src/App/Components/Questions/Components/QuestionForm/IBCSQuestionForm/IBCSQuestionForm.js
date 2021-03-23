import React from 'react';

import BodyCard from '../../../../shared-components/BodyCard/BodyCard';
import BaseQuestionFields from '../BaseQuestionFields/BaseQuestionFields';
import CheckBoxGroup from '../../../../shared-components/CheckBoxGroup';
import ErrorMessage from '../../../../shared-components/ErrorMessage';

class IBCSQuestionForm extends React.Component {
    constructor (props) {
        super(props);

        this.FormFooter = this.props.children;

        this.initialState = this.getBlankInitialState();
        this.state = this.initialState;
    }

    getBlankInitialState = () => {
        return {
            questionType: 'Multiple Choice',
            questionDescription: '',
            correctAnswer: '',
            answerA: '',
            answerB: '',
            answerC: '',
            testType: this.getInitialTestType(),
            topic: {
                majorCategory: '',
                subCategory: ''
            },
            inputValidity: this.getBlankInputValidity(),
            isTopicLoading: false,
            existingTopicCategories: null
        };
    }

    getBlankInputValidity = () => {
        return {
            isQuestionTypeValid: null,
            isQuestionDescriptionValid: null,
            isCorrectAnswerValid: null,
            isAnswerAValid: null,
            isAnswerBValid: null,
            isAnswerCValid: null,
            isTestTypeValid: null,
            isMajorTopicValid: null,
            isSubTopicValid: null
        };
    }

    getInitialTestType = () =>  {
        return {
            tactics: false,
            earlyWarning: false,
            weaponsControl: false
        };
    }

    render() {
        return (
            <BodyCard title={this.props.title}>
                {this.getFormBody()}
                {this.getFormFooter()}
            </BodyCard>
        );
    }

    getFormBody = () => {
        return (
            <div id='issue-form-body'>
                {this.getBaseQuestionFields()}
                {this.getTestTypeField()}
                {this.props.errorMessage ? this.getErrorMessage() : null}
            </div>
        );
    }

    getBaseQuestionFields = () => {
        return <BaseQuestionFields inputHandler={(e) => this.handleInputChange(e)}
            questionType={this.state.questionType} isQuestionTypeValid={this.state.inputValidity.isQuestionTypeValid}
            questionDescription={this.state.questionDescription} isQuestionDescriptionValid={this.state.inputValidity.isQuestionDescriptionValid}
            correctAnswer={this.state.correctAnswer} isCorrectAnswerValid={this.state.inputValidity.isCorrectAnswerValid}
            answerA={this.state.answerA} isAnswerAValid={this.state.inputValidity.isAnswerAValid}
            answerB={this.state.answerB} isAnswerBValid={this.state.inputValidity.isAnswerBValid}
            answerC={this.state.answerC} isAnswerCValid={this.state.inputValidity.isAnswerCValid}/>;
    }

    getTestTypeField = () => {
        return <CheckBoxGroup
            heading='Please select the tests for which this question is applicable:'
            boxGroup={this.getTestTypeParameters()}
            checkboxChange={(e) => this.handleCheckboxChange(e)}
            isValid={this.state.inputValidity.isTestTypeValid}
            errorMessage="At least one 'Test Type' must be selected!"/>;
    }

    getTestTypeParameters = () => {
        return [
            {
                id: 'tactics',
                label: 'Tactics',
                value: this.state.testType.tactics
            },
            {
                id: 'earlyWarning',
                label: 'Early Warning',
                value: this.state.testType.earlyWarning
            },
            {
                id: 'weaponsControl',
                label: 'Weapons Control',
                value: this.state.testType.weaponsControl
            }
        ];
    }

    getErrorMessage = () => {
        return <ErrorMessage message={this.props.errorMessage}/>;
    }

    getFormFooter = () => {
        return React.cloneElement(this.FormFooter, {
            clickHandler: (e) => this.handleClickEvent(e),
            cancelButtonText: 'Clear All',
            cancelButtonID: 'clearAllButton'
        });
    }

    handleInputChange = (event) => {
        const { target: { id, value }} = event;

        if (id === 'questionType') {
            this.setState({ [id]: value, correctAnswer: '', answerA: '', answerB: '', answerC: '' });
        } else {
            this.setState({ [id]: value });
        }
    };

    handleClickEvent = (event) => {
        event.preventDefault();

        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
            this.setState({testType: this.getInitialTestType()});
            this.props.clearErrorMessage();
        } else if (this.isAllInputValid()){
            this.props.submit(event.target.id);
        }
    }

    handleCheckboxChange = (event) => {
        const {target: {id, checked}} = event;

        this.setState({testType: this.getUpdatedTestType(id, checked)});
    };

    getUpdatedTestType = (id, checked) => {
        let testType = this.state.testType;
        testType[id] = checked;
        
        return testType;
    }

    isAllInputValid = () => {
        let inputValidity = this.getInputValidity();
        this.setState({ inputValidity });

        for (const entry in inputValidity) {
            if (!inputValidity[entry]) {
                return false;
            }
        }

        return true;
    };

    getInputValidity = () => {
        return {
            isQuestionTypeValid: this.state.questionType.length > 0 ? true : false,
            isQuestionDescriptionValid: this.state.questionDescription.length > 9  ? true : false,
            isCorrectAnswerValid: this.state.correctAnswer.length > 0 ? true : false,
            isAnswerAValid: this.state.answerA.length > 0 ? true : false,
            isAnswerBValid: this.state.answerB.length > 0 ? true : false,
            isAnswerCValid: this.state.answerC.length > 0 ? true : false,
            isTestTypeValid: (this.state.testType.tactics || this.state.testType.earlyWarning || this.state.testType.weaponsControl),
            isMajorTopicValid: this.state.topic.majorCategory.length > 0 ? true : false,
            isSubTopicValid: this.state.topic.subCategory.length > 0 ? true : false
        };
    };
}

export default IBCSQuestionForm;