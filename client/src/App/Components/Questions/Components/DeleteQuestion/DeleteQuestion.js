import React from 'react';
import Axios from 'axios';

import SingleQuestionSearch from '../SingleQuestionSearch/SingleQuestionSearch';
import SuccessMessage from '../../../shared-components/SuccessMessage/SuccessMessage';

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

    returnToMenu = () => {
        this.setState({submissionResponse: '', successAlert: false})
    };

    deleteQuestion = (questionData) => {        
        Axios.delete('/api/questions/delete', { params: { _id: questionData._id } })
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}))
    };

    render(){
        let deleteQuestionView;

        if (this.state.successAlert) {
            deleteQuestionView = (
                <SuccessMessage message={this.state.submissionResponse.data}
                    clickHandler={() => this.returnToMenu()}/>
            )
        } else {
            deleteQuestionView = (
                <SingleQuestionSearch questionType={this.props.questionType}
                    deleteEvent={(questionData) => this.deleteQuestion(questionData)}
                    action='Delete' deleteButtonText='Delete From Library'
                    submissionResponse={this.state.submissionResponse} successAlert={this.state.successAlert}
                    updateSubmissionResponse={(response) => this.updateSubmissionResponse(response)}/>
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