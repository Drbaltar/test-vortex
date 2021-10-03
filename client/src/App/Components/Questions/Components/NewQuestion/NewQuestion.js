import React from 'react';
import Axios from 'axios';

import SubmissionBody from '../../../shared-components/SubmissionBody/SubmissionBody';
import PatriotQuestionForm from '../QuestionForm/QuestionForm';
import IBCSQuestionForm from '../QuestionForm/IBCSQuestionForm/IBCSQuestionForm';
import FormButtons from '../../../shared-components/FormButtons';

const NewQuestion = ({ questionType }) => {
    const QuestionForm = getApplicableQuestionForm(questionType);

    return (
        <SubmissionBody submitMapping={getSubmitMapping(questionType)}>
            <QuestionForm title={`Add New Question (${questionType})`}>
                <FormButtons submit={true}/>
            </QuestionForm>
        </SubmissionBody>
    );
};

const getApplicableQuestionForm = (questionType) => {
    if (questionType === 'Patriot')
        return PatriotQuestionForm;
    else
        return IBCSQuestionForm;
};

const getSubmitMapping = (questionType) => {
    return {
        submitButton: {
            requestFunction: Axios.post,
            requestURI: `/api/questions/${questionType.toLowerCase()}/pending`
        }
    };
};

export default NewQuestion;