import React from 'react';

import NavigationButtons from '../shared-components/NavigationButtons'

class QuestionReview extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Returns true if all fields have inputs
    isAllFieldsComplete = () => {
        return false;
    }

    render() {
        return(
            <div className='p-4'>
                <h2>This is just a placeholder!!!!</h2>
                <NavigationButtons  previousButton={true} nextButton={true} 
                    isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default QuestionReview;