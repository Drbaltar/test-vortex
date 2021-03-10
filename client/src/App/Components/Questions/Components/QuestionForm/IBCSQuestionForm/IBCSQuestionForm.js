import React from 'react';

import BodyCard from '../../../../shared-components/BodyCard/BodyCard';
import BaseQuestionFields from '../BaseQuestionFields/BaseQuestionFields';

class IBCSQuestionForm extends React.Component {
    constructor (props) {
        super(props);

        this.setBlankInitialState();
    }

    setBlankInitialState = () => {
        this.state = {
            questionType: 'Multiple Choice',
            questionDescription: '',
            correctAnswer: '',
            answerA: '',
            answerB: '',
            answerC: '',
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

    render() {
        return <BodyCard title={this.props.title}>
            {this.getBaseQuestionFields()}
        </BodyCard>;
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

    handleInputChange = (event) => {
        const { target: { id, value }} = event;

        if (id === 'questionType') {
            this.setState({ [id]: value, correctAnswer: '', answerA: '', answerB: '', answerC: '' });
        } else {
            this.setState({ [id]: value });
        }
    };
    
}

export default IBCSQuestionForm;