import React from 'react';

import BodyCard from '../../../../shared-components/BodyCard/BodyCard';
import BaseQuestionFields from '../BaseQuestionFields/BaseQuestionFields';
import CheckBoxGroup from '../../../../shared-components/CheckBoxGroup';
import ErrorMessage from '../../../../shared-components/ErrorMessage';
import TopicCategories from '../Components/TopicCategories/TopicCategories';

class IBCSQuestionForm extends React.Component {
    constructor (props) {
        super(props);

        this.FormFooter = this.props.children;

        this.state = this.getBlankInitialState();
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
                {this.getTopicCategoryFields()}
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

    getTopicCategoryFields = () => {
        return <TopicCategories topic={this.state.topic}
            existingTopicCategories={this.state.existingTopicCategories}
            isMajorTopicValid={this.state.inputValidity.isMajorTopicValid}
            isSubTopicValid={this.state.inputValidity.isSubTopicValid}
            isTopicLoading={this.state.isTopicLoading}
            inputChange={(event) => this.handleTopicInputChange(event)}
            topicChange={(category, value) => this.handleTopicButtonChange(category, value)}/>;
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

    handleCheckboxChange = (event) => {
        const {target: {id, checked}} = event;

        this.setState({testType: this.getUpdatedTestType(id, checked)});
    };

    handleTopicInputChange = (event) => {
        const { target: { id, value }} = event;

        let topic = this.state.topic;
        topic[id] = value;

        this.setState({ topic });
    };

    handleTopicButtonChange = (category, value) => {
        if ( category === 'majorCategory') {
            this.setState({topic: {[category]: value, subCategory: ''}});
        } else if ( category === 'subCategory') {
            this.setState({topic: {majorCategory: this.state.topic.majorCategory, [category]: value,}});
        }
    };

    handleClickEvent = (event) => {
        event.preventDefault();

        if (event.target.id === 'clearAllButton') {
            this.setState(this.getBlankInitialState());
            this.props.clearErrorMessage();
        } else if (this.isAllInputValid()){
            this.props.submit(event.target.id, this.getSubmissionData());
        }
    }

    getUpdatedTestType = (id, checked) => {
        let testType = this.state.testType;
        testType[id] = checked;
        
        return testType;
    }

    isAllInputValid = () => {
        let inputValidity = this.getInputValidity();
        this.setState({ inputValidity });

        return Object.values(inputValidity).includes(false) ? false : true;
    };

    getInputValidity = () => {
        return {
            isQuestionTypeValid: this.state.questionType.length > 0 ? true : false,
            isQuestionDescriptionValid: this.state.questionDescription.length > 9  ? true : false,
            isCorrectAnswerValid: this.state.correctAnswer.length > 0 ? true : false,
            ...this.getAlternateAnswerValidity(),
            isTestTypeValid: (this.state.testType.tactics || this.state.testType.earlyWarning || this.state.testType.weaponsControl),
            isMajorTopicValid: this.state.topic.majorCategory.length > 0 ? true : false,
            isSubTopicValid: this.state.topic.subCategory.length > 0 ? true : false
        };
    };

    getAlternateAnswerValidity = () => {
        if (this.state.questionType === 'Multiple Choice') {
            return {
                isAnswerAValid: this.state.answerA.length > 0 ? true : false,
                isAnswerBValid: this.state.answerB.length > 0 ? true : false,
                isAnswerCValid: this.state.answerC.length > 0 ? true : false,
            };
        } else {
            return {
                isAnswerAValid: null,
                isAnswerBValid: null,
                isAnswerCValid: null
            };
        }

    }

    getSubmissionData = () => {
        let data = {
            questionType: this.state.questionType,
            questionDescription: this.state.questionDescription,
            correctAnswer: this.state.correctAnswer,
            testType: this.getTestTypeArray(),
            topic: this.state.topic
        };

        if (this.state.questionType === 'Multiple Choice') {
            data.answerA = this.state.answerA;
            data.answerB = this.state.answerB;
            data.answerC = this.state.answerC;
        }

        return data;
    }

    getTestTypeArray = () => {
        let testTypeArray = [];

        if (this.state.testType.tactics)
            testTypeArray.push('Tactics');
        if (this.state.testType.earlyWarning)
            testTypeArray.push('Early Warning');
        if (this.state.testType.weaponsControl)
            testTypeArray.push('Weapons Control');

        return testTypeArray;
    };
}

export default IBCSQuestionForm;