import React from 'react';

import NavigationButtons from '../shared-components/NavigationButtons';

class GenerateTest extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Returns true if all fields have inputs
    isAllFieldsComplete = () => {
        return true;
    }

    render() {
        return(
            <div className='p-4'>
                <h2 style={{'textAlign': 'center'}}>Choose to Generate a Test or Save for Later</h2>
                <NavigationButtons  previousButton={true} nextButton={true} 
                    nextButtonID='submitButton' nextButtonText='Submit'
                    isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default GenerateTest;