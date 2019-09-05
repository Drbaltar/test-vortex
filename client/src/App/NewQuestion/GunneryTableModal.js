import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SelectBox from './Components/SelectBox';
import GunnerySelector from './Components/GunnerySelector';

class GunneryTableModal extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            modal: false,
            unitType: '',
            testType: '',
            table: '',
            subtask: ''
        }

        this.state = this.initialState;

        this.toggle = this.toggle.bind(this);
    };

    toggle() {
        if (this.state.modal) {
            this.setState(this.initialState);
        } else {
            this.setState(prevState => ({
                modal: !prevState.modal
        }));
        }
    }

    toggleTestType = () => {
        let testTypeOptions;
        if (this.state.unitType === 'Battalion') {
            testTypeOptions = ['', 'Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Tactics/Communications'];
        } else if (this.state.unitType === 'Battery') {
            testTypeOptions = ['', 'Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Launcher', 'Tactics/Communications'];
        } else return;

        return(
            <SelectBox label="Test Type" id="testType"
                options={testTypeOptions}
                value={this.state.testType}
                inputChange={(event) => this.handleInputChange(event)}/>
        )
    }

    toggleGunnerySelector = () => {
        if (this.state.testType !== '' && this.state.unitType !== '') {
            return(
                <div>
                    <hr className="mt-3"></hr>
                    <GunnerySelector unitType={this.state.unitType}
                        testType={this.state.testType}/>
                </div>
            )
        }
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value}, () => console.log(this.state));        
    };

    render() {
        const testType = this.toggleTestType();
        const gunneryTable = this.toggleGunnerySelector();

        return (
        <div>
            <Button color='info' onClick={this.toggle} className='mt-3 mb-3'>{this.props.buttonLabel}</Button>
            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Select Gunnery Information</ModalHeader>
            <ModalBody>
                <SelectBox label="Unit Type" id="unitType"
                    options={['', 'Battery', 'Battalion']}
                    value={this.state.unitType}
                    inputChange={(event) => this.handleInputChange(event)}/>
                {testType}
                {gunneryTable}
                </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={this.toggle}>Submit</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
  }
}

export default GunneryTableModal;