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

    // Download the newly generated test
    downloadTest = (event) => {
        event.preventDefault();

        let docDefinition = PatriotTestFormat(this.props.testLevel, this.props.testType);
        pdfMake.createPdf(docDefinition).open();
        
    }

    render() {

        return(
            <div className='p-4'>
                <h2 style={{'textAlign': 'center'}}>Choose to Generate a Test or Save for Later</h2>
                <button className="btn btn-secondary"onClick={(event) => this.downloadTest(event)}>Download!</button>
                <NavigationButtons  previousButton={true} nextButton={true} 
                    nextButtonID='submitButton' nextButtonText='Submit'
                    isNextButtonDisabled={!this.isAllFieldsComplete()}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default GenerateTest;