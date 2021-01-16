import React, { Component } from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

export default class SubmissionBody extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            queryResults: [],
            hasQueryRan: false,
            loading: false,
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    }

    render() {
        return(<div>
            {this.getOverallView()}
        </div>);
    }

    getOverallView = () => {
        if(this.state.successAlert && this.state.submissionResponse != '') {
            return this.getSuccessMessage();
        } else {
            return this.props.queryView();
        }
    }

    getSuccessMessage = () => {
        return (
            <SuccessMessage
                message={this.state.submissionResponse}
                clickHandler={(e) => e.preventDefault() && this.revertToInitialState()}
            />
        );
    }

    revertToInitialState = () => {
        this.setState(this.initialState);
    }
}