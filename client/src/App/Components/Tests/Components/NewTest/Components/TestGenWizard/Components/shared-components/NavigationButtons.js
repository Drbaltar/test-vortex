import React from 'react';

const NavigationButtons = (props) => {
    let previousButton;
    let nextButton;

    if (props.previousButton) {
        previousButton = (
            <button type='button' className='btn btn-outline-dark' id={props.previousButtonID || 'previousButton'}
                onClick={props.clickHandler} style={{float: 'left'}}>{props.previousButtonText || 'Previous'}</button>
        );
    }

    if (props.nextButton) {
        if (props.isNextButtonDisabled) {
            nextButton = (
                <button type='button' className='btn btn-primary' id={props.nextButtonID || 'nextButton'}
                    onClick={props.clickHandler} disabled style={{float: 'right'}}>{props.nextButtonText || 'Next'}</button>
            );
        } else {
            nextButton = (
                <button type='button' className='btn btn-primary' id={props.nextButtonID || 'nextButton'}
                    onClick={props.clickHandler} style={{float: 'right'}}>{props.nextButtonText || 'Next'}</button>
            );
        }
    }

    return(
        <div>
            {previousButton}
            {nextButton}
        </div>
    );
};

export default NavigationButtons;