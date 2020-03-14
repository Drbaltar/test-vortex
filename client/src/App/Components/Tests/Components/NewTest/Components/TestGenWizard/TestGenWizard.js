import React from 'react';
import Axios from 'axios';

class TestGenWizard extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isTestTypeComplete: false,
            isSelectionMethodComplete: false,
            isQuestionReviewComplete: false
        };

        this.state = this.initialState;
    }

    render() {
        let selectionActive, reviewActive, generateActive;

        if (!this.state.isTestTypeComplete) {
            selectionActive = "disabled"
            reviewActive = "disabled"
            generateActive = "disabled"
        } else if (!this.state.isSelectionMethodComplete) {
            reviewActive = "disabled"
            generateActive = "disabled"
        } else if (!this.state.isQuestionReviewComplete) {
            generateActive = "disabled"
        }

        return(
            <form className="card bg-light" noValidate>
                <h1 className="card-header">{this.props.title}</h1>
                    <div className="p-4">
                        <ul className="list-group list-group-horizontal row">
                            <li className="list-group-item btn col">Test Type/Parameters</li>
                            <li className={`list-group-item btn col ${selectionActive}`}>Question Selection Method</li>
                            <li className={`list-group-item btn col ${reviewActive}`}>Question Review</li>
                            <li className={`list-group-item btn col ${generateActive}`}>Save/Generate Test</li>
                        </ul>
                    </div>
                <div className="card-footer">
                </div>
            </form> 
        );
    }
}

export default TestGenWizard;