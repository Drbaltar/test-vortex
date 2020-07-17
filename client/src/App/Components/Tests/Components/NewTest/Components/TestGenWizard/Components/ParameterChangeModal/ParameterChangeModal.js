import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ParameterChangeModal = (props)  => {
    return (
        <div>
            <Modal size="md" isOpen={props.modal} toggle={props.toggleModal}>
                <ModalHeader toggle={props.toggleModal}>Parameter Change Confirmation</ModalHeader>
                <ModalBody>
                    <p>Changing this value will reset the progress for generating a new test. Are you sure that you want to change this value?</p>
                </ModalBody>
                <ModalFooter>
                    <button type='button' className='btn btn-outline-primary' id='confirmChange'
                        onClick={() => props.clickHandler(true)} style={{float: 'right'}}>Confirm Change</button>
                    <button type='button' className='btn btn-outline-secondary' id='ignoreChange'
                        onClick={() => props.clickHandler(false)} style={{float: 'right'}}>Cancel Change</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ParameterChangeModal;