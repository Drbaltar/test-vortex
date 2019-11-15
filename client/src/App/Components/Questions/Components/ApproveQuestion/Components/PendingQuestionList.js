import React from 'react';

const PendingQuestionList = (props) => {
    let pendingQuestionList = props.list;
    let index = 0;

    const filledList = pendingQuestionList.map(entry =>
        <div type="button" className="btn btn-block btn-outline-secondary">
            <div className="row" key={index++}>
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