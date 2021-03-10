import React from 'react';

import SubmissionBody from '../../../shared-components/SubmissionBody/SubmissionBody';
import PatriotQuestionForm from '../QuestionForm/QuestionForm';
import IBCSQuestionForm from '../QuestionForm/IBCSQuestionForm/IBCSQuestionForm';

const NewQuestion = (props) => {
    const { questionType } = props;
    const QuestionForm = getApplicableQuestionForm(questionType);

    return (
        <SubmissionBody>
            <QuestionForm title={`Add New Question (${questionType})`}/>
        </SubmissionBody>
    );
};

const getApplicableQuestionForm = (questionType) => {
    if (questionType === 'Patriot')
        return PatriotQuestionForm;
    else
        return IBCSQuestionForm;
};

export default NewQuestion;