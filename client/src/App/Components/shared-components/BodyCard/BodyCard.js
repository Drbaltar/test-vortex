import React from 'react';

const BodyCard = (props) => {
    const { title } = props;

    let bodyContents, footerContents;

    if (Array.isArray(props.children)) {
        bodyContents = props.children[0];
        footerContents = props.children.length > 1 ? props.children[1] : null;
    } else {
        bodyContents = props.children;
        footerContents = null;
    }


    return (
        <form className="card bg-light" noValidate>
            {getCardHeader(title)}
            {getCardBody(bodyContents)}
            {footerContents ? getCardFooter(footerContents) : null}
        </form>
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

const getCardFooter = (footerContents) => {
    return (
        <div className='card-footer'>
            {footerContents}
        </div>
    );
};

export default BodyCard;
