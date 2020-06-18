import React from 'react';

import TestVersionCard from './Components/TestVersionCard/TestVersionCard';
import NavigationButtons from '../shared-components/NavigationButtons';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PatriotTestFormat from './Components/PatriotTestFormat/PatriotTestFormat';
import PatriotKeyFormat from './Components/PatriotKeyFormat/PatriotKeyFormat';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class GenerateTest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: this.getTodaysDateString()
        };
    }
    
    // Creates a string of the current date in the DDMMMYY format
    getTodaysDateString = () => {
        const today = new Date(Date.now());
        return `${today.getDate()}${new Intl.DateTimeFormat('en-US', {month: 'short'}).format(today).toUpperCase()}${today.getYear()-100}`;
    }

    // Create document definition for the test
    createTestDefinition = (version) => {
        return PatriotTestFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, version, this.state.date, this.props.testQuestions,
            this.props.testVersions.find((testOutline) => (testOutline.version === version)));
    }

    // Create document definition for the answer key
    createAnswerKeyDefinition = (version) => {
        return PatriotKeyFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, version, this.state.date, this.props.testQuestions,
            this.props.testVersions.find((testOutline) => (testOutline.version === version)));
    }

    // Open the newly generated test
    openTest = (event) => {
        event.preventDefault();

        let version = event.target.id.charAt(event.target.id.length-1);
        
        pdfMake.createPdf(this.createTestDefinition(version)).open();
    }

    // Download the newly generated test
    downloadTest = (event) => {
        event.preventDefault();

        let version = event.target.id.charAt(event.target.id.length-1);
        
        pdfMake.createPdf(this.createTestDefinition(version)).download();
    }

    // Open the newly generated answer key
    openKey = (event) => {
        event.preventDefault();

        let version = event.target.id.charAt(event.target.id.length-1);
        
        pdfMake.createPdf(this.createAnswerKeyDefinition(version)).open();
    }

    // Download the newly generated answer key
    downloadKey = (event) => {
        event.preventDefault();

        let version = event.target.id.charAt(event.target.id.length-1);
        
        pdfMake.createPdf(this.createAnswerKeyDefinition(version)).download();
    }

    render() {
        const testCards = this.props.testVersions.map((testOutline) => {
            return (<TestVersionCard version={testOutline.version} key={`Version ${testOutline.version}`}
                openTest={(event) => this.openTest(event)}
                downloadTest={(event) => this.downloadTest(event)}
                openKey={(event) => this.openKey(event)}
                downloadKey={(event) => this.downloadKey(event)}/>
            )
        })

        return(
            <div className='p-4'>
                <h2 className='pb-4'>Step 5: Preview/Download a Test or Save for Later</h2>
                {testCards}
                <NavigationButtons  previousButton={true} nextButton={true} 
                    nextButtonID='submitButton' nextButtonText='Save Test'
                    isNextButtonDisabled={false}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default GenerateTest;