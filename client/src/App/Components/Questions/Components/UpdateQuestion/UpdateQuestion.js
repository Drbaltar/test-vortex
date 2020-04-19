import React from 'react';
import Axios from 'axios';

import SingleQuestionSearch from '../SingleQuestionSearch/SingleQuestionSearch';
import SuccessMessage from '../../../shared-components/SuccessMessage/SuccessMessage';

class updateQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    }

    updateSubmissionResponse = (response) => {
        this.setState({ submissionResponse: response });
    }

    returnToMenu = () => {
        this.setState({submissionResponse: '', successAlert: false});
    };

    updateQuestion = (questionData) => {
        Axios.put('/api/questions/update', questionData)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}));
    };

    render(){
        let updateQuestionView;

        if (this.state.successAlert) {
            updateQuestionView = (
                <SuccessMessage message={this.state.submissionResponse.data}
                    clickHandler={() => this.returnToMenu()}/>
            );
        } else {
            updateQuestionView = (
                <div>
                    <SingleQuestionSearch questionType={this.props.questionType}
                        submitButtonText="Update" submitEvent={(questionData) => this.updateQuestion(questionData)}
                        cancelButtonText="Revert Changes" action='Update'
                        submissionResponse={this.state.submissionResponse} successAlert={this.state.successAlert}
                        updateSubmissionResponse={(response) => this.updateSubmissionResponse(response)}/>
                </div>
            );
        }
        return (
            <div>
                {updateQuestionView}
            </div>
        );
    }
}

export default updateQuestion;