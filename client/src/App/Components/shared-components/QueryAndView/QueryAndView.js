import React, { Component } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

export default class QueryAndView extends Component {
    constructor(props) {
        super(props);
        
        this.QueryHeader = this.props.children[0];
        this.QueryList = this.props.children[1];
        this.DetailView = this.props.children[2];

        this.initialState = {
            queryResults: [],
            queryErrorMessage: '',
            hasQueryRan: false,
            isLoading: false,
            selectedEntry: null,
            detailViewFlag: false
        };

        this.state = this.initialState;
    }

    render() {
        return this.state.detailViewFlag ? this.getDetailView() : this.getQueryView();
    }

    getQueryView = () => {
        return <div>
            {this.getQueryHeader()}
            {this.state.isLoading ? this.getLoadingSpinnner() : null}
            {this.state.queryErrorMessage !== '' ? this.getErrorMessage() : null}
            {this.state.hasQueryRan ? this.getQueryList() : null}
        </div>;
    }

    getQueryHeader = () => {
        return React.cloneElement(this.QueryHeader,
            {
                hasQueryRan: this.state.hasQueryRan,
                query: (e) => this.handleQueryClick(e)
            }
        );
    }

    getLoadingSpinnner = () => {
        return <LoadingSpinner />;
    }

    getErrorMessage = () => {
        return <ErrorMessage message={this.state.queryErrorMessage}/>;
    }

    getQueryList = () => {
        return React.cloneElement(this.QueryList,
            {
                list: this.state.queryResults,
                showDetail: (e, index) => this.handleShowDetailClick(e, index)
            });
    }

    getDetailView = () => {
        return React.cloneElement(this.DetailView, 
            {
                data: this.state.selectedEntry,
                submissionResponse: this.props.submissionResponse,
                submit: this.props.submit,
                cancel: (e) => this.handleCancelDetailClick(e)
            });
    }

    handleQueryClick = (e) => {
        e.preventDefault();

        this.setLoadingToTrue();

        this.props.query(this.props.queryPath)
            .then((results) => this.setState({ isLoading: false, queryResults: results.data, hasQueryRan: true }))
            .catch((error) => this.setState({ isLoading: false, queryErrorMessage: error }));
    }

    handleShowDetailClick = (e, selectedIndex) => {
        e.preventDefault();

        this.setDetailViewParameters(selectedIndex);
    }

    handleCancelDetailClick = (e) => {
        e.preventDefault();

        this.setState({ selectedEntry: null, detailViewFlag: false });
    }

    setLoadingToTrue = () => {
        this.setState({ isLoading: true });
    }

    setDetailViewParameters = (selectedIndex) => {
        this.setState({ detailViewFlag: true, selectedEntry: this.state.queryResults[selectedIndex] });
    }
}