import React from 'react';  // eslint-disable-line no-unused-vars

const SelectBox = (props) => {
    let options = props.options;
    const selectableOptions =
        options.map(option => <option key={option}>{option}</option>);

    return(
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <select className="form-control" id={props.id} onChange={props.inputChange}
                value={props.value}>
                {selectableOptions}
            </select>
        </div>
    );
};

export default SelectBox;