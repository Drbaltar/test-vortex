import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const QuestionPreviewModal = (props)  => {
    return (
        <div>
            <Modal size="lg" isOpen={props.modal} toggle={props.toggleModal}>
                <ModalHeader toggle={props.toggleModal}>Question Action</ModalHeader>
                <ModalBody>
                    <b>What would you like to do with the following question?</b>
                    <div className='pt-3'>
                        {props.testQuestion ? props.testQuestion.question_description : ''}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type='button' className='btn btn-primary' id='replaceQuestionSameTopicButton'
                        onClick={props.toggleModal} style={{float: 'right'}}>Replace Question (Same Topic)</button>
                    <button type='button' className='btn btn-primary' id='replaceQuestionNewTopicButton'
                        onClick={props.toggleModal} style={{float: 'right'}}>Replace Question (New Topic)</button>
                    <button type='button' className='btn btn-danger' id='reportIssueButton'
                        onClick={props.toggleModal} style={{float: 'right'}}>Report Issue</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default QuestionPreviewModal;