import React from 'react';
import ListEntry from '../../../../../shared-components/ListEntry/ListEntry';

const IssueEntry = (props) => {
    const { issue, select, index } = props;

    return (
        <div className="btn btn-block btn-outline-dark p-3"
            onClick={() => select(index)}>
            <ListEntry entryFields={getIssueFields(issue)}/>
        </div>
    );
};

const getIssueFields = (issue) => {
    return [
        {
            label: 'Issue Type:',
            field: issue.issue_type,
        },
        {
            label: 'Issue Category:',
            field: issue.issue_category
        },
        {
            label: 'Issue Description:',
            field: issue.issue_description
        },
        {
            label: 'Submitted By:',
            field: issue.submitted_by
        }
    ];
}; 

export default IssueEntry;
