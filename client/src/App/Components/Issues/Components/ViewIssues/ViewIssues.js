import React from 'react';
import axios from 'axios';

import BodyCard from '../../../shared-components/BodyCard/BodyCard';
import SubmissionBody from '../../../shared-components/SubmissionBody/SubmissionBody';
import QueryAndView from '../../../shared-components/QueryAndView/QueryAndView';
import QueryAllHeader from '../../../shared-components/QueryAndView/Components/QueryAllHeader/QueryAllHeader';
import QueryList from '../../../shared-components/QueryAndView/Components/QueryList/QueryList';
import IssueEntry from '../../../shared-components/QueryAndView/Components/QueryList/Components/IssueEntry/IssueEntry';

const ViewIssues = () => {
    return (
        <BodyCard title='View Existing Issues'>
            <SubmissionBody submit={() => {}}>
                <QueryAndView query={axios.get} queryPath={'/api/issues/all'}>
                    <QueryAllHeader />
                    <QueryList entryType='Issue'>
                        <IssueEntry />
                    </QueryList>
                </QueryAndView>
            </SubmissionBody>
        </BodyCard>
    );
};

export default ViewIssues;