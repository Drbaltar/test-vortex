import React from 'react';
import Axios from 'axios';

import QuestionList from '../QuestionList/QuestionList';
import QuestionForm from '../QuestionForm/QuestionForm';

class UpdateQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            searchInput: '',
            searchResults: [],
            loading: false,
            selectedEntry: null,
            detailedView: false,
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    };

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value});
    };

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'queryButton') {
            this.getSearchResults();
        };
    };

    showDetails = (index) => {
        this.setState({ detailedView: true, selectedEntry: index})
    };

    returnToMenu = () => {
        this.setState({ detailedView: false, selectedEntry: null})
    };

    getSearchResults = () => {
        this.setState({loading: true});

        Axios.get('/api/questions/search', { params: { _id: this.state.searchInput } })
            .then((response) => this.setState({searchResults: [response.data], loading: false}))
            .catch((response) => this.setState({submissionResponse: response, loading: false}))
    };

    updateQuestion = (questionData) => {
        Axios.put('/api/questions/update-existing', questionData)
            .then((response) => this.setState({submissionResponse: response, successAlert: true}))
            .catch((response) => this.setState({submissionResponse: response}))
    };

    render() {
        let updateQuestionView;

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
            
            updateQuestionView = (
                <form className="card bg-light" noValidate>
                    <h1 className="card-header">Update Existing Question ({this.props.questionType})</h1>
                    <label className="pt-3 pl-3" htmlFor={"searchInput"}>Question ID</label>
                    <div className="form-group ml-3 mr-3">
                        <div className="row">
                            <input className="form-control ml-3 col-6" type="text" id="searchInput" value={this.state.searchInput}
                                    placeholder={'Please enter the Question ID'}
                                    onChange={(e) => {this.handleInputChange(e)}}/>
                                <div className="btn btn-primary ml-3"  id="queryButton"
                                    onClick={(event) => this.handleClickEvent(event)}>
                                    Search
                                </div>
                            </div>
                    </div>
                    <div className="p-4">
                        {loadingSpinner}
                        <QuestionList list={this.state.searchResults}
                            showDetails={(index) => this.showDetails(index)}/>
                    </div>
                </form>
            )
        } else {
            if (this.state.successAlert) {
                updateQuestionView = (
                    <div className="alert alert-success" role="alert">
                        {this.state.submissionResponse.data}
                    </div>
            )} else {
                updateQuestionView = (
                    <div>
                        <div className="btn btn-secondary mt-4" style={{marginLeft: "20px"}} id="returnButton"
                            onClick={this.returnToMenu}>
                            &#8678; Go Back
                        </div>
                        <QuestionForm title="Question Details" data={this.state.searchResults[this.state.selectedEntry]}
                            submitButtonText="Update" cancelButtonText="Revert Changes"
                            submitEvent={(questionData) => this.updateQuestion(questionData)}/>
                    </div>
                )
            }
        }

        return (
            <div>
                {updateQuestionView}
            </div>
        )
    };

}

export default UpdateQuestion;