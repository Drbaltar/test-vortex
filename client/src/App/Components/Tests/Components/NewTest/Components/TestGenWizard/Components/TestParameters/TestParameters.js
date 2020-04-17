import React from 'react';

import SelectBox from '../../../../../../../shared-components/SelectBox'
import NavigationButtons from '../shared-components/NavigationButtons'

class TestParameters extends React.Component {
    constructor(props) {
        super(props);
    }

    // Returns the possible test options based on the unit echelon 
    // and test level IAW the TC 3-01.86 dated December 2017
    getTestTypeOptions = () => {
        if (this.props.unitType === 'Battalion') {
            if (this.props.testLevel === 'Table IV') {
                return(['', 'Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command']);
            } else if (this.props.testLevel === 'Table VIII') {
                return(['', 'Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Tactics/Communications']);
            } else {
                return(['']);
            }
        } else if (this.props.unitType === 'Battery') {
            if (this.props.testLevel === 'Table IV') {
                return(['', 'Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Launcher']);
            } else if (this.props.testLevel === 'Table VIII') {
                return(['', 'Tactics', 'RSOP', 'Early Warning/Mission Command', 'Launcher', 'Tactics/Communications']);
            } else {
                return(['']);
            }
        } else {
            return(['']);
        };
    }

    // Returns true if all fields have inputs
    isAllFieldsComplete = () => {
        if (this.props.unitType !== '' && this.props.testLevel !== '' && this.props.testType !== '') {
            return true;
        } else {
            return false;
        }
    }

    render() {
        // Change the selectable test type options based on the unit type and test level
      let testTypeOptions = this.getTestTypeOptions();

        return(
            <div className='p-4'>
                <h2 style={{'textAlign': 'center'}}>Choose Test Type</h2>
                <SelectBox label="Unit Type" id="unitType"
                    options={['', 'Battery', 'Battalion']}
                    value={this.props.unitType}
                    inputChange={(event) => this.props.inputChange(event)}/>
                <SelectBox label="Test Level" id="testLevel"
                    options={['', 'Table IV', 'Table VIII']}
                    value={this.props.testLevel}
                    inputChange={(event) => this.props.inputChange(event)}/>
                <SelectBox label="Test Type" id="testType"
                    options={testTypeOptions}
                    value={this.props.testType}
                    inputChange={(event) => this.props.inputChange(event)}/>
                <NavigationButtons nextButton={true} isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default TestParameters;