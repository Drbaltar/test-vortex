import React from 'react';

import NavigationButtons from '../shared-components/NavigationButtons'

class QuestionReview extends React.Component {
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
                <h2 style={{'textAlign': 'center'}}>Review All Test Questions</h2>
                <NavigationButtons  previousButton={true} nextButton={true} 
                    isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default QuestionReview;