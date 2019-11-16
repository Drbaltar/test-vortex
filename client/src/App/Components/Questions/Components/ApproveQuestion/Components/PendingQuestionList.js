import React from 'react';

const PendingQuestionList = (props) => {
    let pendingQuestionList = props.list;

    const filledList = pendingQuestionList.map((entry, index) =>
        <div key={index} className="btn btn-block btn-outline-dark p-3"
        onClick={() => props.showDetails(index)}>
            <div className="row">
                <div className="col-sm">
                    <label>Test Type:</label>
                    <input readOnly={true} className="form-control" type="text" placeholder={entry.gunnery_table[0].test_type}></input>
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
    )

    return (
        <div>
            {filledList}
        </div>
    )
};

export default PendingQuestionList;