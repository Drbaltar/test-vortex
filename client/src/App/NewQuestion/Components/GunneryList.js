import React from 'react';

const GunneryList = (props) => {
    let gunneryList = props.list;

    const filledList = gunneryList.map(entry =>
        <div className="row">
            <div className="col-sm">
                <label>Unit Type:</label>
                <input readonly="true" class="form-control" type="text" placeholder={entry.unitType}></input>
            </div>
            <div className="col-sm">
                <label>Test Type:</label>
                <input readonly="true" class="form-control" type="text" placeholder={entry.testType}></input>
            </div>
            <div className="col-sm">
                <label>Gunnery Table:</label>
                <input readonly="true" class="form-control" type="text" placeholder={entry.table}></input>
            </div>
            <div className="col-sm">
                <label>Subtask:</label>
                <input readonly="true" class="form-control" type="text" placeholder={entry.subtask}></input>
            </div>
        </div>
    )
    
    return(
        <div className="border border-muted rounded pb-3 pl-3 pr-3">
            <p id="applicableSubtaskLabel" className="form-text">Applicable Gunnery Table/Subtasks:</p>
            {filledList}
        </div>
    )
};

export default GunneryList;