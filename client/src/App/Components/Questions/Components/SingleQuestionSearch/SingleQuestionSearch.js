import React from 'react';
import Axios from 'axios';

import QuestionList from '../QuestionList/QuestionList';
import QuestionForm from '../QuestionForm/QuestionForm';

class SingleQuestionSearch extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            searchInput: '',
            searchResults: null,
            searchReturned: false,
            loading: false,
            detailedView: false,
        };

        this.state = this.initialState;
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value});
    };

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'queryButton') {
            this.getSearchResults();
        }
    };

    showDetails = () => {
        this.setState({ detailedView: true});
    };

    returnToMenu = () => {
        this.setState({ detailedView: false});
    };

    getSearchResults = () => {
        this.setState({searchResults: null, searchReturned: false, loading: true});

        Axios.get('/api/questions/patriot/approved', { params: { _id: this.state.searchInput } })
            .then((response) => this.setState({searchResults: response.data, searchReturned: true, loading: false}))
            .catch((error) => {
                this.setState({loading: false}, () => {this.props.updateSubmissionResponse(error);});
            });
    };

    displaySearchResults = () => {
        let loadingSpinner;
        let searchResults;

        if (this.state.loading) {
            loadingSpinner = (
                <div className="d-flex justify-content-center mb-3">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        if (this.state.searchResults) {
            searchResults = (
                <QuestionList list={[this.state.searchResults]}
                    showDetails={() => this.showDetails()}/>
            );
        } else {
            if (this.state.searchReturned) {
                searchResults = (
                    <div>
                        <p>
                            No Search Results Found!
                        </p>
                    </div>
                );
            }
        }

        return (
            <div className="p-4">
                {loadingSpinner}
                {searchResults}
            </div>
        );
    };

    render() {
        let questionSearchView;

        if (!this.state.detailedView) {
            questionSearchView = (
                <form className="card bg-light" noValidate>
                    <h1 className="card-header">{`${this.props.action} Existing Question (${this.props.questionType})`}</h1>
                    <label className="pt-3 pl-3" htmlFor={'searchInput'}>Question ID</label>
                    <div className="form-group ml-3 mr-3">
                        <div className="row">
                            <input className="form-control ml-3 col-6" type="text" id="searchInput" value={this.state.searchInput}
                                placeholder={'Please enter the Question ID'}
                                onChange={(e) => {this.handleInputChange(e);}}/>
                            <div className="btn btn-primary ml-3"  id="queryButton"
                                onClick={(e) => this.handleClickEvent(e)}>
                                    Search
                            </div>
                        </div>
                    </div>
                    {this.displaySearchResults()}

                </form>
            );
        } else {
            questionSearchView = (
                <div>
                    <div className="btn btn-secondary mt-4" style={{marginLeft: '20px'}} id="returnButton"
                        onClick={this.returnToMenu}>
                        &#8678; Go Back
                    </div>
                    <QuestionForm title="Question Details" data={this.state.searchResults}
                        submitButtonText={this.props.submitButtonText}
                        submitEvent={(questionData) => this.props.submitEvent(questionData)}
                        cancelButtonText={this.props.cancelButtonText}
                        deleteButtonText={this.props.deleteButtonText}
                        deleteEvent={(questionData) => this.props.deleteEvent(questionData)}/>
                </div>
            );
        }

        return (
            <div>
                {questionSearchView}
            </div>
        );
    }

}

export default SingleQuestionSearch;