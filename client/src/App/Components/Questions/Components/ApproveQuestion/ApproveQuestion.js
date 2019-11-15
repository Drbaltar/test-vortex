import React from 'react';
import Axios from 'axios';

import FormButtons from '../../../shared-components/FormButtons';
import PendingQuestionList from './Components/PendingQuestionList';

class ApproveQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            allPendingQuestions: [],
            loading: false,
            detailedView: false
        };

        this.state = this.initialState;
    };

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
        } else if (event.target.id === 'submitButton') {
            this.getAllPendingQuestions();
        }
    };

    getAllPendingQuestions = () => {
        Axios.get('/api/questions/pending')
            .then((response) => this.setState({allPendingQuestions: response.data}))
    }

    render() {
        let approveQuestionView;

        if (!this.state.detailedView) {
            approveQuestionView = (
                <form className="card bg-light" noValidate>
                    <h1 className="card-header">Approve Pending Questions ({this.props.questionType})</h1>
                    <div className="p-4">
                        <PendingQuestionList list={this.state.allPendingQuestions}/>
                    </div>
                    <FormButtons clickHandler={(event) => this.handleClickEvent(event)}/>
                </form>
            )
        } else {

        }

        return (
            <div>
                {approveQuestionView}
            </div>
        )
    };

}

export default ApproveQuestion;