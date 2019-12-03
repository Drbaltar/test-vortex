import React from 'react';
import Axios from 'axios';

import PendingQuestionList from './Components/PendingQuestionList';
import QuestionForm from '../QuestionForm/QuestionForm';

class ApproveQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            allPendingQuestions: [],
            loading: false,
            selectedEntry: null,
            detailedView: false,
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    };

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'queryButton') {
            this.getAllPendingQuestions();
        };
    };

    showDetails = (index) => {
        this.setState({ detailedView: true, selectedEntry: index})
    };

    returnToMenu = () => {
        this.setState({ detailedView: false, selectedEntry: null})
    };

    getAllPendingQuestions = () => {
        this.setState({loading: true});

        Axios.get('/api/questions/pending')
            .then((response) => this.setState({allPendingQuestions: response.data, loading: false}))
    };

    approveNewQuestion = (questionData) => {
        Axios.post('/api/questions/approve', questionData)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}))
    };

    updatePendingQuestion = (questionData) => {
        Axios.post('api/questions/update-pending', questionData)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}))
    }

    render() {
        let approveQuestionView;

        if (!this.state.detailedView) {
            let loadingSpinner;

            if (this.state.loading) {
                loadingSpinner = (
                    <div className="d-flex justify-content-center mb-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
            
            approveQuestionView = (
                <form className="card bg-light" noValidate>
                    <h1 className="card-header">Approve Pending Questions ({this.props.questionType})</h1>
                    <div className="pt-3 pr-3">
                        <div className="btn btn-primary" style={{float: "right"}} id="queryButton"
                            onClick={(event) => this.handleClickEvent(event)}>
                            &#8635; Refresh List
                        </div>
                    </div>
                    <div className="p-4">
                        {loadingSpinner}
                        <PendingQuestionList list={this.state.allPendingQuestions}
                            showDetails={(index) => this.showDetails(index)}/>
                    </div>
                </form>
            )
        } else {
            if (this.state.successAlert) {
                approveQuestionView = (
                    <div className="alert alert-success" role="alert">
                        {this.state.submissionResponse.data}
                    </div>
            )} else {
                approveQuestionView = (
                    <div>
                        <div className="btn btn-secondary mt-4" style={{marginLeft: "20px"}} id="returnButton"
                            onClick={this.returnToMenu}>
                            &#8678; Go Back
                        </div>
                        <QuestionForm title="Question Details" data={this.state.allPendingQuestions[this.state.selectedEntry]}
                            submitButtonText="Approve" cancelButtonText="Revert Changes"
                            submitEvent={(questionData) => this.approveNewQuestion(questionData)}
                            updateEvent={(questionData) => this.updatePendingQuestion(questionData)}/>
                    </div>
                )
            }
        }

        return (
            <div>
                {approveQuestionView}
            </div>
        )
    };

}

export default ApproveQuestion;