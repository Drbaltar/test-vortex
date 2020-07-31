import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TestSaveModal = (props) => {

    return (
        <div>
            <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Save Test</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                    <label htmlFor="testName">Test Name</label>
                    <div className="input-group mb-3">
                        <input id='testName' onChange={props.inputChange} type="text" className="form-control" 
                            placeholder="Please input a name for the test or select 'Default'" aria-label="testName"
                            value={props.testName}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button"
                                id="defaultTestNameButton" onClick={props.clickHandler}>Default</button>
                        </div>
                    </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button id="submitTestButton" color="success" 
                        onClick={props.clickHandler} disabled={props.testName === ''}>Submit</Button>
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default TestSaveModal;