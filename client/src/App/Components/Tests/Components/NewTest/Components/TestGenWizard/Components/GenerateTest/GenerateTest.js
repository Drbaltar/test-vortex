import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import NavigationButtons from '../shared-components/NavigationButtons';
import PatriotTestFormat from './Components/PatriotTestFormat/PatriotTestFormat';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class GenerateTest extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Returns true if all fields have inputs
    isAllFieldsComplete = () => {
        return true;
    }

    // Creates a string of the current date in the DDMMMYY format
    getTodaysDateString = () => {
        const today = new Date(Date.now());
        return `${today.getDate()}${new Intl.DateTimeFormat('en-US', {month: 'short'}).format(today).toUpperCase()}${today.getYear()-100}`;
    }

    // Download the newly generated test
    downloadTest = (event) => {
        event.preventDefault();

        let docDefinition = PatriotTestFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, 'A', this.getTodaysDateString(), this.props.testQuestions);
        
        pdfMake.createPdf(docDefinition).open();
        
    }

    render() {

        return(
            <div className='p-4'>
                <h2 style={{'textAlign': 'center'}}>Choose to Generate a Test or Save for Later</h2>
                <button className="btn btn-secondary"onClick={(event) => this.downloadTest(event)}>Open Test!</button>
                <NavigationButtons  previousButton={true} nextButton={true} 
                    nextButtonID='submitButton' nextButtonText='Submit'
                    isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default GenerateTest;