import React from 'react';

import NavigationButtons from '../shared-components/NavigationButtons'

class QuestionSelectionMethod extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Returns true if all fields have inputs
    isAllFieldsComplete = () => {
        // Only question slider and auto selection needed for form to be complete
        if (this.props.numberOfQuestions && this.props.questionSelection === "auto") {
            return true;
        }
    }

    render() {
        return(
            <div className='p-4'>
                <h2 style={{'textAlign': 'center'}}>Choose Question Selection Method</h2>
                <label htmlFor='numberOfQuestions'>Number of Questions</label>
                <input type='range' className='custom-range' id='numberOfQuestions'
                    min={this.props.minQuestions} max={this.props.maxQuestions} value={this.props.numberOfQuestions}
                    onChange={this.props.inputChange}/>
                <p style={{'textAlign': 'center'}}>{`${this.props.numberOfQuestions} Questions`}</p>
                <div className="custom-control custom-radio mb-2">
                    <input type="radio" id="autoSelectRadio" name="selectionMethodRadio" className="custom-control-input"
                        onChange={this.props.radioChange} value="auto" checked={this.props.questionSelection === "auto"}/>
                    <label className="custom-control-label" htmlFor="autoSelectRadio">Automatic Question Selection</label>
                </div>
                <div className="custom-control custom-radio mb-4">
                    <input type="radio" id="manualSelectRadio" name="selectionMethodRadio" className="custom-control-input"
                        onChange={this.props.radioChange} value="manual" checked={this.props.questionSelection === "manual"}/>
                    <label className="custom-control-label" htmlFor="manualSelectRadio">Manual Question Selection</label>
                </div>
                <NavigationButtons  previousButton={true} nextButton={true} 
                    isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default QuestionSelectionMethod;