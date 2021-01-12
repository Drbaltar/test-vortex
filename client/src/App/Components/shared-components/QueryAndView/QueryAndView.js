import React, { Component } from 'react';

export default class QueryAndView extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            queryResults: [],
            hasQueryRan: false,
            loading: false,
            selectedEntry: null,
            detailedView: false,
            submissionResponse: '',
            successAlert: false
        };

        this.state = this.initialState;
    }

    render() {
        return <div>
            {this.props.queryHeader({
                hasQueryRan: this.state.hasQueryRan,
                query: this.props.query
            })}
        </div>;
    }
}