import React from 'react';

const TextField = (props) => {
    return(
        <div className="form-group">
            <label for={props.id}>{props.label}</label>
            <textarea className="form-control" type={props.type} id={props.id}  value={props.value}
                placeholder={"Please enter the " + props.label.toLowerCase()} rows={props.rows}
                onChange={props.inputChange}
            />
        </div>
    )
}

export default TextField;