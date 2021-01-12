import React from 'react';
import QueryButton from './Components/QueryButton';

const QueryAllHeader = (props) => {
    const { hasQueryRan, query } = props;

    return <div>
        <QueryButton hasQueryRan={hasQueryRan} query={query}/>
    </div>;
};

export default QueryAllHeader;