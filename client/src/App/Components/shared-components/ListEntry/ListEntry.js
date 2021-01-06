import React from 'react';

const ListEntry = (props) => {
    const { entryFields } = props;
    
    return (
        <div className='row'>
            {getPopulatedFields(entryFields)}
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

export default ListEntry;