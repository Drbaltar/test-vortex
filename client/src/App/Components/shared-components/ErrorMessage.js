import React from 'react';

const ErrorMessage = (props) => {
    return(
        <div className="alert alert-warning">
            {props.message}
        </div>
    );
};

export default ErrorMessage;