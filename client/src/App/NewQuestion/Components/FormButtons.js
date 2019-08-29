import React from 'react';  // eslint-disable-line no-unused-vars

const FormButtons = (props) => {
    return(
        <div className="form-buttons mt-4">
            <button className="btn btn-success" id="submitButton"
                onClick={props.clickHandler}>Submit</button>
            <button className="btn btn-secondary ml-4" id="clearAllButton"
                onClick={props.clickHandler}>Clear All</button>
        </div>
    );
};

export default FormButtons;