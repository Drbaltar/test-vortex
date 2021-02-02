import React from 'react';
import ListEntry from '../../../../../shared-components/ListEntry/ListEntry';

const IssueEntry = (props) => {
    const { entry, index, select } = props;

    return <ListEntry entryFields={getIssueFields(entry)} index={index} select={select}/>
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
