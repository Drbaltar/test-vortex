import React from 'react';

const QuestionPreview = (props) => {
    let questionList = props.testQuestions;
    let searchResultsMessage;

    if (questionList.length === 0) {
        searchResultsMessage = (
            <div>
                <p>{'No Questions Found!'}</p>
            </div>
        );
    } else if (questionList.length > 0) {
        searchResultsMessage = (
            <div>
                <p>{`${questionList.length} ${questionList.length === 1 ? 'Question' : 'Questions'} Found for the Test!`}</p>
            </div>
        );
    }

    let index = 0;
    const filledList = questionList.map((entry, index) => {
        if (entry.question_type === 'Multiple Choice') {
            return (
                <div key={index++}>
                    <li className="list-group-item">
                        <div style={{fontSize:'110%'}}>
                            {`${entry.question_description}`}
                        </div>
                        <div style={{marginLeft: '25px'}}>
                            <b>{`${entry.correct_answer}`}</b> <br/>
                            {`${entry.answer_a}`} <br/>
                            {`${entry.answer_b}`} <br/>
                            {`${entry.answer_c}`}
                        </div>    
                    </li>
                </div>
            )
        } else if (entry.question_type === 'Fill-in-the-Blank') {
            return (
                <div key={index++}>
                    <li className="list-group-item">
                        <div style={{fontSize:'110%'}}>
                            {`${entry.question_description}`}
                        </div>
                        <div style={{marginLeft: '25px'}}>
                            <b>{`${entry.correct_answer}`}</b>
                        </div>
                    </li>
                </div>
            )
        } else if (entry.question_type === 'True or False') {
            return (
                <div key={index++}>
                    <li className="list-group-item">
                        <div style={{fontSize:'110%'}}>
                            {`${entry.question_description}`}
                        </div>
                        <div style={{marginLeft: '25px'}}>
                            {entry.correct_answer === 'True' ? 
                                <div><b>True</b><br/>False</div> :
                                <div>True<br/><b>False</b></div>}
                        </div>
                    </li>
                </div>
            )
        }
    });

    return (
        <div>
            {searchResultsMessage}
            <div className='list-group pb-3'>
                {filledList}    
            </div>
        </div>
    );
};

export default QuestionPreview;