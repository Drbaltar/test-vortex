import React, { Component } from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

export default class SubmissionBody extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            submissionResponse: '',
            successFlag: false
        };

        this.state = this.initialState;
    }

    render() {
        return(<div>
            {this.getOverallView()}
        </div>);
    }

    getOverallView = () => {
        if(this.state.successFlag && this.state.submissionResponse != '') {
            return this.getSuccessView();
        } else {
            return this.getFormView();
        }
    }

    getFormView = () => {
        return React.cloneElement(this.props.children,
            { 
                submissionResponse: this.state.submissionResponse,
                submit: (e, data) => this.handleSubmitClick(e, data)
            }
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

    handleReturnClick = (e) => {
        e.preventDefault();

        this.setState(this.initialState);
    }

    handleSubmitClick = (e, data) => {
        e.preventDefault();
        
        this.props.submit(data)
            .then(response => this.setState({ submissionResponse: response, successFlag: true }))
            .catch(error => this.setState({ submissionResponse: error }));
    }
}