import React from 'react';

import QuestionPreview from './Components/QuestionPreview/QuestionPreview';
import NavigationButtons from '../shared-components/NavigationButtons';

const QuestionReview = (props) => {
    
    let loadingSpinner;
    let questionList;

    if (props.loadingQuestions) {
        loadingSpinner = (
            <div className="d-flex justify-content-center mb-3">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.hasSearchRan) {
        questionList= (
            <QuestionPreview testQuestions={props.testQuestions}/>
        );
    }

    return(
        <div className='p-4'>
            <h2 className='pb-4'>Step 4: Review All Test Questions</h2>
            {questionList}
            {loadingSpinner}
            <NavigationButtons  previousButton={true} nextButton={true} 
                isNextButtonDisabled={false}
                clickHandler={props.clickHandler}/>
        </div> 
    );
}

export default QuestionReview;