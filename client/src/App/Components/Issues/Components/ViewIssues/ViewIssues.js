import React from 'react';
import axios from 'axios';

import SubmissionBody from '../../../shared-components/SubmissionBody/SubmissionBody';
import QueryAndView from '../../../shared-components/QueryAndView/QueryAndView';
import QueryAllHeader from '../../../shared-components/QueryAndView/Components/QueryAllHeader/QueryAllHeader';
import QueryList from '../../../shared-components/QueryAndView/Components/QueryList/QueryList';
import IssueEntry from '../../../shared-components/QueryAndView/Components/QueryList/Components/IssueEntry/IssueEntry';
import IssueForm from '../IssueForm/IssueForm';

const ViewIssues = () => {
    return (
        <SubmissionBody submit={() => {}}>
            <QueryAndView title={'View Existing Issues'} query={axios.get} queryPath={'/api/issues/all'}>
                <QueryAllHeader />
                <QueryList entryType='Issue'>
                    <IssueEntry />
                </QueryList>
                <IssueForm />
            </QueryAndView>
        </SubmissionBody>
    );
};

export default ViewIssues;