import React, { Component } from 'react';

import SuccessMessage from '../SuccessMessage/SuccessMessage';

export default class SubmissionBody extends Component {
    constructor(props) {
        super(props);
        this.FormView = this.props.children;

        this.initialState = {
            submissionResponse: '',
            successFlag: false
        };

        this.state = this.initialState;
    }

    render() {
        return <div className='col sub-body'>
            {this.getOverallView()}
        </div>;
    }

    getOverallView = () => {
        if(this.state.successFlag && this.state.submissionResponse !== '') {
            return this.getSuccessView();
        } else {
            return this.getFormView();
        }
    }

    getFormView = () => {
        return (
            React.cloneElement(this.FormView,
                { 
                    errorMessage: this.state.submissionResponse,
                    clearErrorMessage: () => this.clearResponse(),
                    submit: (buttonID, data) => this.handleSubmitClick(buttonID, data)
                }
            )
        );
    }

    getSuccessView = () => {
        return (
            <SuccessMessage
                message={this.state.submissionResponse}
                clickHandler={(e) => this.handleReturnClick(e)}
            />
        );
    }

    handleSubmitClick = (buttonID, data) => {
        const { requestFunction, requestURI, param } = this.props.submitMapping[buttonID];
        const fullURI = this.getFullURI(requestURI, param, data)

        requestFunction(fullURI, param ? null : data)
            .then(response => this.setSuccessMessage(response.data))
            .catch(error => this.setErrorMessage(error));
    }

    getFullURI = (baseURI, param, data) => {
        if (param) {
            return baseURI + data._id;
        } else {
            return baseURI;
        }
    }

    setSuccessMessage = (message) => {
        this.setState({submissionResponse: message, successFlag: true});
    }

    setErrorMessage = (error) => {
        let errorMessage;

        if (error.response) {
            errorMessage = error.response.data.message ? error.response.data.message : error.response.data;
        } else if (error.request) {
            errorMessage = 'There was an issue processing your request to the server. Please try to resubmit.';
        } else {
            errorMessage = 'There was an issue when creating your request to the server. Please try to resubmit.';
        }

        this.setState({ submissionResponse: errorMessage });
    }

    handleReturnClick = (e) => {
        e.preventDefault();

        this.clearResponse();
    }

    clearResponse = () => {
        this.setState(this.initialState);
    }
}