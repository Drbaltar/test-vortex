import React from 'react';

const ListEntry = (props) => {
    const { entryFields, index, select } = props;
    
    return (
        <div className="btn btn-block btn-outline-dark p-3"
            onClick={(e) => handleSelectClick(e, index, select)}>
            <div className='row'>
                {getPopulatedFields(entryFields)}
            </div>
        </div>
    );
};

const getPopulatedFields = (entryFields) => {
    return entryFields.map((entryField, index) => 
        <div key={index} className='col-sm'>
            <label>{entryField.label}</label>
            <input readOnly={true} className="form-control" type="text" placeholder={entryField.field}></input>
        </div>
    );
};

const handleSelectClick = (e, index, select) => {
    e.preventDefault();

    select(index);
};

export default ListEntry;