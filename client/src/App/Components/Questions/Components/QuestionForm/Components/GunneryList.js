import React from 'react';

const GunneryList = (props) => {
    let gunneryList = props.list;
    let index = 0;

    const filledList = gunneryList.map(entry =>
        <div className="row" key={index}>
            <div className="col-sm">
                <label>Unit Type:</label>
                <input readOnly={true} className="form-control" type="text" placeholder={entry.unitType}></input>
            </div>
            <div className="col-sm">
                <label>Test Type:</label>
                <input readOnly={true} className="form-control" type="text" placeholder={entry.testType}></input>
            </div>
            <div className="col-sm">
                <label>Gunnery Table:</label>
                <input readOnly={true} className="form-control" type="text" placeholder={entry.table}></input>
            </div>
            <div className="col-sm">
                <label>Subtask:</label>
                <input readOnly={true} className="form-control" type="text" placeholder={entry.subtask}></input>
            </div>
            <button id={index++} type="button" className="close pl-2 pr-2" style={{color: 'darkred'}} aria-label="Remove"
                onClick={(e) => props.deleteEntry(e.target.id)}>&times;
            </button>
        </div>
    );

    // Assign the correct color to borderColor based on whether the prop states the input value is valid
    // and create an optional error message if the field does not have a valid input
    let borderColor;
    let errorMessage;
    if (props.isValid != null) {
        if (props.isValid) {
            borderColor = 'border-success';
        } else {
            borderColor = 'border-danger';
            errorMessage = (<small style={{color: 'darkred'}}>
                {props.errorMessage}
            </small>);
        }
    }
    
    return(
        <div>
            <div className={`border border-muted ${borderColor} rounded pb-3 pl-3 pr-3`}>
                <p id="applicableSubtaskLabel" className="form-text">Applicable Gunnery Table/Subtasks:</p>
                {filledList}
            </div>
            {errorMessage}
        </div>
    );
};

export default GunneryList;