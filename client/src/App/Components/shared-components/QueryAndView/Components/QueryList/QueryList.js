import React from 'react';

const QueryList = (props) => {
    const { list, entryType, selectEntry } = props;
    const Entry = props.children;

    return(
        <div> 
            <p id='query-list-message'>{getErrorMessage(entryType, list.length)}</p>
            {getList(Entry, list, selectEntry)}
        </div>
    );
};

const getErrorMessage = (entryType, length) => {
    if (length === 0) {
        return `No ${entryType}s Found!`;
    } else {
        return `${length} ${entryType}${length > 1 ? 's' : ''} Found!`;
    }
};

const getList = (Entry, list, selectEntry) => {
    return list.map((entry, index) => {
        return React.cloneElement(Entry,
            { 
                entry: entry,
                key: index,
                select: selectEntry,
                index
            }
        );
    });
};

QueryList.defaultProps = {
    list: []
};

export default QueryList;
