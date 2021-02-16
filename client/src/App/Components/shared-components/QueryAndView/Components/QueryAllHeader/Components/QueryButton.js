import React from 'react';

const QueryButton = (props) => {
    const { hasQueryRan, query } = props;

    return (
        <div 
            className="btn btn-primary"
            style={{float: 'right'}}
            id="queryButton"
            onClick={query}>
            {getButtonText(hasQueryRan)}
        </div>
    );
};

const getButtonText = (hasQueryRan) => {
    return hasQueryRan ? '\u21BB Refresh List' : 'Search';
};

export default QueryButton;