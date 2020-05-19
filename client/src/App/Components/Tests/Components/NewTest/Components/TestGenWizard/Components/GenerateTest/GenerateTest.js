import React from 'react';

import TestVersionCard from './Components/TestVersionCard/TestVersionCard';
import NavigationButtons from '../shared-components/NavigationButtons';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PatriotTestFormat from './Components/PatriotTestFormat/PatriotTestFormat';
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
    createTestDefinition = (action) => {
        let version;
        let questions;

        if (action === 'openTestA' || action === 'downloadTestA') {
            version = 'A';
            questions = this.props.testVersions[0];
        } else if (action === 'openTestB' || action === 'downloadTestB') {
            version = 'B';
            questions = this.props.testVersions[1];
        }

        return PatriotTestFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, version, this.state.date, questions);
    }

    // Open the newly generated test
    openTest = (event) => {
        event.preventDefault();
        
        pdfMake.createPdf(this.createTestDefinition(event.target.id)).open();
    }

    // Download the newly generated test
    downloadTest = (event) => {
        event.preventDefault();
        
        pdfMake.createPdf(this.createTestDefinition(event.target.id)).download();
    }

    // Open the newly generated answer key
    openKey = (event) => {
        event.preventDefault();

        let version;
        let questions;
        if (event.target.id === 'openKeyA') {
            version = 'A';
            questions = this.props.versionA;
        } else if (event.target.id === 'openKeyB') {
            version = 'B';
            questions = this.props.versionB;
        }

        let docDefinition = PatriotTestFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, version, this.state.date, questions);
        
        pdfMake.createPdf(docDefinition).open();
    }

    // Download the newly generated answer key
    downloadKey = (event) => {
        event.preventDefault();

        let version;
        let questions;
        if (event.target.id === 'openKeyA') {
            version = 'A';
            questions = this.props.versionA;
        } else if (event.target.id === 'openKeyB') {
            version = 'B';
            questions = this.props.versionB;
        }

        let docDefinition = PatriotTestFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, version, this.state.date, questions);
        
        pdfMake.createPdf(docDefinition).open();
    }

    render() {
        return(
            <div className='p-4'>
                <h2 style={{'textAlign': 'center'}}>Choose to Generate a Test or Save for Later</h2>
                <TestVersionCard version='A' openTest={(event) => this.openTest(event)}
                    downloadTest={(event) => this.downloadTest(event)}/>
                <TestVersionCard version='B' openTest={(event) => this.openTest(event)}
                    downloadTest={(event) => this.downloadTest(event)}/>
                <NavigationButtons  previousButton={true} nextButton={true} 
                    nextButtonID='submitButton' nextButtonText='Save Test'
                    isNextButtonDisabled={false}
                    clickHandler={this.props.clickHandler}/>
            </div> 
        );
    }
}

export default GenerateTest;