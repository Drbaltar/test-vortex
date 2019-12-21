import React from 'react';
import Axios from 'axios';

import SingleQuestionSearch from '../SingleQuestionSearch/SingleQuestionSearch';

class DeleteQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            submissionResponse: '',
            successAlert: false
        }

        this.state = this.initialState;
    }

    updateSubmissionResponse = (response) => {
        this.setState({ submissionResponse: response })
    }

    deleteQuestion = (questionData) => {        
        Axios.delete('/api/questions/delete', { params: { _id: questionData._id } })
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}))
    };

    render(){
        let deleteQuestionView;

        if (this.state.successAlert) {
            deleteQuestionView = (
                <div className="alert alert-success" role="alert">
                    {this.state.submissionResponse.data}
                </div>
            )
        } else {
            deleteQuestionView = (
                <div>
                    <SingleQuestionSearch questionType={this.props.questionType}
                        submitButtonText="Delete" submitEvent={(questionData) => this.deleteQuestion(questionData)}
                        cancelButtonText="Revert Changes"
                        submissionResponse={this.state.submissionResponse} successAlert={this.state.successAlert}
                        updateSubmissionResponse={(response) => this.updateSubmissionResponse(response)}/>
                </div>
            )
        }
        return (
            <div>
                {deleteQuestionView}
            </div>
        )
    };
}

export default DeleteQuestion;