import React from 'react';

const TextArea = (props) => {
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
            <textarea className={`form-control ${validTag}`} type={props.type} id={props.id}  value={props.value}
                placeholder={'Please enter the ' + props.label.toLowerCase()} rows={props.rows}
                onChange={props.inputChange}
            />
            {errorMessage}
        </div>
    );
};

export default TextArea;