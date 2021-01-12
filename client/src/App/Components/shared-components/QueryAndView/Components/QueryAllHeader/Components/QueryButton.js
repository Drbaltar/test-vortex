import React from 'react';

const QueryButton = (props) => {
    const { hasQueryRan, query } = props;

    return (
        <div 
            className="btn btn-primary"
            style={{float: 'right'}}
            id="queryButton"
            onClick={() => query()}>
            {getButtonText(hasQueryRan)}
        </div>
    );
};

const getButtonText = (hasQueryRan) => {
    return hasQueryRan ? '&#8635; Refresh List' : 'Search';
};

export default QueryButton;