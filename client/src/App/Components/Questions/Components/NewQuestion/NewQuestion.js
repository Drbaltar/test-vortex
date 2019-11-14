import React from 'react';
import Axios from 'axios';

import QuestionForm from '../QuestionForm/QuestionForm';

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            submissionResponse: '',
            successAlert: false
        }

        this.state = this.initialState;
    }

    submitNewQuestion = (questionData) => {
        Axios.post('/api/questions/submit', questionData)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}))
    }

    render() {
        let newQuestionView;

        if (this.state.successAlert) {
            newQuestionView = (
                <div className="alert alert-success" role="alert">
                    {this.state.submissionResponse.data}
                </div>
            )
        } else {
            newQuestionView = (
                <QuestionForm title="Add New Question (Patriot)"
                    submitEvent={(questionData) => this.submitNewQuestion(questionData)}/>
            )
        }
        return(
            <div>
                {newQuestionView}
            </div>
        );
    }
}

export default NewQuestion;