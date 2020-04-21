import React from 'react';

import NavigationButtons from '../shared-components/NavigationButtons';

class QuestionReview extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Returns true if all fields have inputs
    isAllFieldsComplete = () => {
        return true;
    }

    render() {
        let loadingSpinner;

        if (this.props.loadingQuestions) {
            loadingSpinner = (
                <div className="d-flex justify-content-center mb-3">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return(
            <div className='p-4'>
                <h2 style={{'textAlign': 'center'}}>Review All Test Questions</h2>
                <div>
                    {/* <p>{this.props.testQuestions}</p> */}
                </div>
                {loadingSpinner}
                <NavigationButtons  previousButton={true} nextButton={true} 
                    isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default QuestionReview;