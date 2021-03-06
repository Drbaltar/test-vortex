import React from 'react';

const FormButtons = (props) => {
    let submitButton;
    let cancelButton;
    let deleteButton;

    if (props.submit || props.submitButtonText) {
        submitButton = (
            <button className="btn btn-success" id={props.submitButtonID || 'submitButton'}
                onClick={props.clickHandler}>{props.submitButtonText || 'Submit'}</button>
        );
    }

    if (props.cancel || props.cancelButtonText) {
        cancelButton = (
            <button className="btn btn-secondary ml-4" id={props.cancelButtonID || 'cancelButton'}
                onClick={props.clickHandler}>{props.cancelButtonText || 'Cancel'}</button>
        );
    }

    if (props.deleteButtonText) {
        deleteButton = (
            <button className="btn btn-danger ml-4" id={props.deleteButtonID}
                onClick={props.clickHandler}>{props.deleteButtonText}</button>
        );
    }

    return(
        <div className="form-buttons">
            {submitButton}
            {cancelButton}
            {deleteButton}
        </div>
    );
};

export default FormButtons;