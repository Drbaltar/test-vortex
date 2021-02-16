import React from 'react';
import QueryButton from './Components/QueryButton';

const QueryAllHeader = (props) => {
    const { hasQueryRan, query } = props;

    return <div className="pb-4">
        <QueryButton hasQueryRan={hasQueryRan} query={query}/>
    </div>;
};

export default QueryAllHeader;