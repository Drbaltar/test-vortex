import React from 'react';
import Axios from 'axios';

import SubmissionBody from '../../../shared-components/SubmissionBody/SubmissionBody';
import IssueForm from '../IssueForm/IssueForm';
import FormButtons from '../../../shared-components/FormButtons';

const NewIssue = () => {
    return (
        <SubmissionBody submitMapping={submitMapping}>
            <IssueForm title='Submit New Issue'>
                <FormButtons submit={true} cancelButtonText='Clear All' cancelButtonID='clearAllButton'/>
            </IssueForm>
        </SubmissionBody>
    );
};

const submitMapping = {
    submitButton: {
        requestFunction: Axios.post,
        requestURI: '/api/issues/submit'
    }
};

export default NewIssue;