import React from 'react';

import TestGenWizard from './Components/TestGenWizard/TestGenWizard';
import SuccessMessage from '../../../shared-components/SuccessMessage/SuccessMessage';

class NewTest extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    }

    returnToMenu = () => {
        this.setState({submissionResponse: '', successAlert: false});
    }

    render() {
        let newTestView;

        if (this.state.successAlert) {
            newTestView = (
                <SuccessMessage message={this.state.submissionResponse.data}
                    clickHandler={() => this.returnToMenu()}/>
            );
        } else {
            newTestView = (
                <TestGenWizard title={`Generate New Test (${this.props.testType})`}/>
            );
        }
        return(
            <div>
                {newTestView}
            </div>
        );
    }
}

export default NewTest;