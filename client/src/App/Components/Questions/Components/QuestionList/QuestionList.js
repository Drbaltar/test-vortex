import React from 'react';

const QuestionList = (props) => {
    let questionList = props.list;
    let searchResultsMessage;

    if (props.hasSearchRan) {
        if (questionList.length === 0) {
            searchResultsMessage = (
                <div>
                    <p>{'No Pending Questions Found!'}</p>
                </div>
            );
        } else if (questionList.length > 0) {
            searchResultsMessage = (
                <div>
                    <p>{`${questionList.length} Pending ${questionList.length === 1 ? 'Question' : 'Questions'} Awaiting Approval!`}</p>
                </div>
            );
        }
    }

    const filledList = questionList.map((entry, index) =>
        <div key={index} className="btn btn-block btn-outline-dark p-3"
            onClick={() => props.showDetails(index)}>
            <div className="row">
                <div className="col-sm">
                    <label>Test Type:</label>
                    <input readOnly={true} className="form-control" type="text" placeholder={`${entry.gunnery_table[0].test_type} (${entry.gunnery_table[0].unit_type})`}></input>
                </div>
                <div className="col-sm">
                    <label>Question Type:</label>
                    <input readOnly={true} className="form-control" type="text" placeholder={entry.question_type}></input>
                </div>
                <div className="col-sm">
                    <label>Question:</label>
                    <input readOnly={true} className="form-control" type="text" placeholder={entry.question_description}></input>
                </div>
                <div className="col-sm">
                    <label>Correct Answer:</label>
                    <input readOnly={true} className="form-control" type="text" placeholder={entry.correct_answer}></input>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {searchResultsMessage}
            {filledList}
        </div>
    );
};

export default QuestionList;