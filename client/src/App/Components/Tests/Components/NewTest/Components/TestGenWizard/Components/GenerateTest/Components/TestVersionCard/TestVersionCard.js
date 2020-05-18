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
                        <button type='button' id={`openTest${props.version}`} className="btn btn-outline-dark mr-2" onClick={(event) => props.openTest(event)}>Preview</button>
                        <button type='button' id={`downloadTest${props.version}`} className="btn btn-outline-dark" onClick={(event) => props.downloadTest(event)}>Download</button>
                    </div>
                </div>
                <hr/>
                <div className="row mx-2">
                    <div className="mr-auto">
                        <h5>Answer Key</h5>
                    </div>
                    <div>
                        <button type='button' id={`openKey${props.version}`} className="btn btn-outline-dark mr-2" onClick={(event) => props.openKey(event)}>Preview</button>
                        <button type='button' id={`downloadKey${props.version}`} className="btn btn-outline-dark" onClick={(event) => props.downloadKey(event)}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestVersionCard;