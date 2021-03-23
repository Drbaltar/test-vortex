import React from 'react';

const CheckBoxGroup = (props) => {
    const { heading, boxGroup, checkboxChange, isValid, errorMessage } = props;

    return( 
        <div>
            <div className={`border border-muted ${getBorderColor(isValid)} rounded p-3`}>
                {heading ? <p>{heading}</p> : null}
                {boxGroup ? getCheckBoxes(boxGroup, checkboxChange) : null}
            </div>
            {isValid === false ? getErrorMessage(errorMessage) : null}
        </div>
    );
};

const getCheckBoxes = (boxGroup, checkboxChange) => {
    return boxGroup.map((entry) => {
        return <div className="form-check" key={entry.id}>
            <input className="form-check-input" type="checkbox" id={entry.id}
                onChange={checkboxChange} checked={entry.value}/>
            <label className="form-check-label" htmlFor={entry.label}>{entry.label}</label>
        </div>;
    });
};

const getBorderColor = (isValid) => {
    if (isValid !== null)
        return isValid ? 'border-success' : 'border-danger';
    else
        return '';
};

const getErrorMessage = (errorMessage) => {
    return <small style={{color: 'darkred'}}>{errorMessage}</small>;
};

export default CheckBoxGroup;