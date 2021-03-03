import React from 'react';
import Axios from 'axios';

import QuestionForm from '../QuestionForm/QuestionForm';
import IBCSQuestionForm from '../QuestionForm/IBCSQuestionForm';
import SuccessMessage from '../../../shared-components/SuccessMessage/SuccessMessage';

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    }

    submitNewQuestion = (questionData) => {
        Axios.post(`/api/questions/${this.props.questionType.toLowerCase()}/pending`, questionData)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}));
    }

    returnToForm = () => {
        this.setState({submissionResponse: '', successAlert: false});
    }

    render() {
        let newQuestionView;

        if (this.state.successAlert) {
            newQuestionView = (
                <SuccessMessage message={this.state.submissionResponse.data}
                    clickHandler={() => this.returnToForm()}/>
            );
        } else {
            newQuestionView = this.getApplicableQuestionForm();
        }
        return(
            <div>
                {newQuestionView}
            </div>
        );
    }

    getApplicableQuestionForm = () => {
        if (this.props.questionType === 'Patriot') {
            return this.getPatriotQuestionForm();
        } else if (this.props.questionType === 'IBCS') {
            return this.getIBCSQuestionForm();
        }
    }

    getPatriotQuestionForm = () => {
        return <QuestionForm title={`Add New Question (Patriot)`}
            submitEvent={(questionData) => this.submitNewQuestion(questionData)}
            submitButtonText='Submit' cancelButtonText='Clear All'/>
    }

    getIBCSQuestionForm = () => {
        return <IBCSQuestionForm title={`Add New Question (IBCS)`}
            submitEvent={(questionData) => this.submitNewQuestion(questionData)}
            submitButtonText='Submit' cancelButtonText='Clear All'/>
    }
}

export default NewQuestion;