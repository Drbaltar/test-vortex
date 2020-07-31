import React from 'react';

const TestVersionCard = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 style={{'textAlign': 'center'}}>{`Version ${props.version}`}</h3>
                <div className="row mx-2">
                    <div className="mr-auto">
                        <h5>Written Exam</h5>
                    </div>
                    <div>
                        <button type='button' id={`openTest_${props.version}`} 
                            className="btn btn-outline-dark mr-2"
                            onClick={(event) => props.clickHandler(event)}>Preview</button>
                        <button type='button' id={`downloadTest_${props.version}`}
                            className="btn btn-outline-dark"
                            onClick={(event) => props.clickHandler(event)}>Download</button>
                    </div>
                </div>
                <hr/>
                <div className="row mx-2">
                    <div className="mr-auto">
                        <h5>Answer Key</h5>
                    </div>
                    <div>
                        <button type='button' id={`openKey_${props.version}`}
                            className="btn btn-outline-dark mr-2"
                            onClick={(event) => props.clickHandler(event)}>Preview</button>
                        <button type='button' id={`downloadKey_${props.version}`}
                            className="btn btn-outline-dark"
                            onClick={(event) => props.clickHandler(event)}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestVersionCard;