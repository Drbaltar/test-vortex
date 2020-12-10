/*
*  This module serves as a React Component that 
*  displays the view for submitting new issues
*  Author: Kyle McCain
*  Date: 10 December 2020
*/

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
            .then((response) => this.setSuccesMessage(response))
            .catch((error) => {
                if(error.response) {
                    this.setErrorMessage(error.response.data.message);
                } else if (error.request) {
                    this.setErrorMessage( 
                        'There was an error submitting your issue! ' +
                        'Verify you have a valid Internet connection and try to resubmit.')
                } else {
                    this.setErrorMessage(  
                        'There was an internal client error when trying to submit your issue! ' +
                        'Please try to resubmit.')
                }
            })
    }

    setSuccesMessage = (message) => {
        this.setState({submissionResponse: message, successAlert: true})
    }

    setErrorMessage = (message) => {
        this.setState({submissionResponse: message})
    }

    getNewIssueView = () => {
        return (
            <IssueForm submitEvent={(issueData) => this.submitNewIssue(issueData)}
                submitButtonText='Submit' cancelButtonText='Clear All'
                errorMessage={this.state.submissionResponse}
                clearErrorMessage={() => this.clearErrorMessage()}/>
        )
    }

    getSuccessMessage = () => {
        return (
            <SuccessMessage message={this.state.submissionResponse.data}
                clickHandler={() => this.returnToForm()}/>
        );
    }

    clearErrorMessage = () => {
        this.setState({submissionResponse: ''})
    }

    returnToForm = () => {
        this.setState(this.initialState);
    }

    render() {
        return(
            <div>
                {this.state.successAlert ? this.getSuccessMessage() : this.getNewIssueView()}
            </div>
        );
    }
}

export default NewIssue;