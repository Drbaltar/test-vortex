import React from 'react';
import Axios from 'axios';

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

    saveNewTest = (newTest) => {
        Axios.post('/api/tests/save-new', newTest)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}));
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
                <TestGenWizard title={`Generate New Test (${this.props.testType})`}
                    saveNewTest={(newTest) => this.saveNewTest(newTest)}/>
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