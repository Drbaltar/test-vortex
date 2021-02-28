import React from 'react';
import Axios from 'axios';

import QuestionForm from '../QuestionForm/QuestionForm';
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
        Axios.post('/api/questions/patriot/pending', questionData)
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
            newQuestionView = (
                <QuestionForm title={`Add New Question (${this.props.questionType})`}
                    submitEvent={(questionData) => this.submitNewQuestion(questionData)}
                    submitButtonText='Submit' cancelButtonText='Clear All'/>
            );
        }
        return(
            <div>
                {newQuestionView}
            </div>
        );
    }
}

export default NewQuestion;