import React from 'react';

import './SuccessMessage.css';

const SuccessMessage = (props) => {
    return (
        <div className="card border-success" noValidate>
            <div className="p-4">
                <h4>{props.message}</h4>
            </div>
            <div className="card-footer">
                <button className="btn btn-success return-btn" id="Return Button"
                    onClick={props.clickHandler}>Return</button>
            </div>
        </div> 
    );
};

export default SuccessMessage;