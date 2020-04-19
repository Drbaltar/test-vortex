import React from 'react';

const SelectBox = (props) => {
    let options = props.options;
    const selectableOptions =
        options.map(option => <option key={option} title={option}>{option}</option>);

    // Assign the correct className to validTag based on whether the prop states the input value is valid
    // and create an optional error message if the field does not have a valid input
    let validTag;
    let errorMessage;
    if (props.isValid != null) {
        if (props.isValid) {
            validTag = 'is-valid';
        } else {
            validTag = 'is-invalid';
            errorMessage = (<small style={{color: 'darkred'}}>
                {props.errorMessage}
            </small>);
        }
    }

    return(
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <select className={`form-control ${validTag}`} id={props.id} onChange={props.inputChange}
                value={props.value} size={props.size || 1}>
                {selectableOptions}
            </select>
            {errorMessage}
        </div>
    );
};

export default SelectBox;