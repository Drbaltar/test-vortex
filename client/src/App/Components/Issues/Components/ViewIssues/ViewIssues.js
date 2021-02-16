import React from 'react';
import Axios from 'axios';

import SubmissionBody from '../../../shared-components/SubmissionBody/SubmissionBody';
import QueryAndView from '../../../shared-components/QueryAndView/QueryAndView';
import QueryAllHeader from '../../../shared-components/QueryAndView/Components/QueryAllHeader/QueryAllHeader';
import QueryList from '../../../shared-components/QueryAndView/Components/QueryList/QueryList';
import IssueEntry from '../../../shared-components/QueryAndView/Components/QueryList/Components/IssueEntry/IssueEntry';
import IssueForm from '../IssueForm/IssueForm';
import FormButtons from '../../../shared-components/FormButtons';

const ViewIssues = () => {
    return (
        <SubmissionBody submitMapping={submitMapping}>
            <QueryAndView title={'View Existing Issues'} query={Axios.get} queryPath={'/api/issues/all'}>
                <QueryAllHeader />
                <QueryList entryType='Issue'>
                    <IssueEntry />
                </QueryList>
                <IssueForm>
                    <FormButtons cancelButtonText='Revert Changes' cancelButtonID='clearAllButton'
                        deleteButtonText='Close Issue' deleteButtonID='deleteButton'/>
                </IssueForm>
            </QueryAndView>
        </SubmissionBody>
    );
};

const submitMapping = {
    deleteButton: {
        requestFunction: Axios.delete,
        requestURI: '/api/issues/byID/',
        param: true
    }
};

export default ViewIssues;