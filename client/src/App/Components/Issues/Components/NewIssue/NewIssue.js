import React from 'react';
import Axios from 'axios';

import IssueForm from '../IssueForm/IssueForm';
import SuccessMessage from '../../../shared-components/SuccessMessage/SuccessMessage';

class NewIssue extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    }

    submitNewIssue = (issueData) => {
        Axios.post('/api/issues/submit', issueData)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((error) => {
                if(error.response) {
                    this.setState({submissionResponse: error.response.data.message});
                } else if (error.request) {
                    this.setState({submissionResponse: 
                        'There was an error submitting your issue! ' +
                        'Verify you have a valid Internet connection and try to resubmit.'})
                } else {
                    this.setState({submissionResponse: 
                        'There was an internal client error when trying to submit your issue! ' +
                        'Please try to resubmit.'})
                }
            })
    }

    clearErrorMessage = () => {
        this.setState({submissionResponse: ''})
    }

    returnToForm = () => {
        this.setState({submissionResponse: '', successAlert: false});
    }

    render() {
        let newIssueView;
        console.log(this.state.submissionResponse);

        if (this.state.successAlert) {
            newIssueView = (
                <SuccessMessage message={this.state.submissionResponse.data}
                    clickHandler={() => this.returnToForm()}/>
            );
        } else {
            newIssueView = (
                <IssueForm submitEvent={(issueData) => this.submitNewIssue(issueData)}
                    submitButtonText='Submit' cancelButtonText='Clear All'
                    errorMessage={this.state.submissionResponse}
                    clearErrorMessage={() => this.clearErrorMessage()}/>
            );
        }
        return(
            <div>
                {newIssueView}
            </div>
        );
    }
}

export default NewIssue;