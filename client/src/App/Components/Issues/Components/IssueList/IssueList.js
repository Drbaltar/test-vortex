import React from 'react';
import IssueEntry from './Components/IssueEntry/IssueEntry';

const IssueList = (props) => {
    const { list, selectEntry } = props;

    return(
        <div>
            <p id='issue-list-message'>{getErrorMessage(list.length)}</p>
            {getIssueList(list, selectEntry)}
        </div>
    );
};

const getErrorMessage = (length) => {
    if (length === 0) {
        return 'No Issues Found!';
    } else {
        return `${length} Open Issue${length > 1 ? 's' : ''} Found!`;
    }
};

const getIssueList = (list, selectEntry) => {
    return list.map((entry, index) =>
        <IssueEntry issue={entry} key={index} select={selectEntry} index={index}/>
    );
};

IssueList.defaultProps = {
    list: []
};

export default IssueList;
