import React from 'react';

const BodyCard = (props) => {
    const { title } = props;
    const bodyContents = props.children;

    return (
        <div className="col sub-body">
            <form className="card bg-light" noValidate>
                {getCardHeader(title)}
                {getCardBody(bodyContents)}
            </form>
        </div>
    );
};

const getCardHeader = (title) => {
    return <h1 className="card-header">{title}</h1>;
};

const getCardBody = (bodyContents) => {
    return (
        <div className="p-4">
            {bodyContents}
        </div>
    );
};

export default BodyCard;
