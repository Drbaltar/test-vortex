import React from 'react';

const FormButtons = (props) => {
    return(
        <div className="form-buttons">
            <button className="btn btn-success" id={props.submitButtonID}
                onClick={props.clickHandler}>{props.submitButtonText}</button>
            <button className="btn btn-secondary ml-4" id={props.cancelButtonID}
                onClick={props.clickHandler}>{props.cancelButtonText}</button>
        </div>
    );
};

export default FormButtons;