import React from 'react';

const SelectBox = (props) => {
    let options = props.options;
    const selectableOptions =
        options.map(option => <option key={option}>{option}</option>)

    return(
        <div className="form-group">
            <label for={props.id}>{props.label}</label>
            <select className="form-control" id={props.id} onChange={props.inputChange}>
                {selectableOptions}
            </select>
        </div>
    )
}

export default SelectBox;