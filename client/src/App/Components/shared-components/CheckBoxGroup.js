import React from 'react';

const CheckBoxGroup = (props) => {
    return( 
        <div className="border border-muted rounded mt-3 p-3">
            {props.boxGroup ? getCheckBoxes(props) : null}
        </div>
    );
};

const getCheckBoxes = (props) => {
    return props.boxGroup.map((entry) => {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" value={entry.value} id="createVersionB"
                onChange={props.checkboxChange} checked={entry.value}/>
            <label className="form-check-label" htmlFor={entry.label}>{entry.label}</label>
        </div>
    })
};

export default CheckBoxGroup;