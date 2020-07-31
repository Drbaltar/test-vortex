import React from 'react';

import TestVersionCard from './Components/TestVersionCard/TestVersionCard';
import NavigationButtons from '../shared-components/NavigationButtons';
import TestSaveModal from './Components/TestSaveModal/TestSaveModal';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PatriotTestFormat from './Components/PatriotTestFormat/PatriotTestFormat';
import PatriotKeyFormat from './Components/PatriotKeyFormat/PatriotKeyFormat';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class GenerateTest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            testSaveModal: false,
            testName: ''
        };
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;

        this.setState({[id]: value});   
    };

    handleClickEvent = (event) => {
        event.preventDefault();

        if (event.target.id === 'saveTestButton') {
            this.toggleSaveTestModal();
        } else if (event.target.id === 'submitTestButton') {
            this.submitTest();
        } else if (event.target.id === 'defaultTestNameButton') {
            this.setDefaultTestName();
        } else {
            this.props.clickHandler(event);
        }
    }

    toggleSaveTestModal = () => {
        if (this.state.testSaveModal) {
            this.setState({testName: '', testSaveModal: false})
        } else {
            this.setState({testSaveModal: true});
        }
    }

    // Create document definition for the test
    createTestDefinition = (version) => {
        return PatriotTestFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, version, this.props.date, this.props.testQuestions,
            this.props.testVersions.find((testOutline) => (testOutline.version === version)));
    }

    // Create document definition for the answer key
    createAnswerKeyDefinition = (version) => {
        return PatriotKeyFormat(this.props.unitType, this.props.testLevel, 
            this.props.testType, version, this.props.date, this.props.testQuestions,
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

    setDefaultTestName = () => {
        let testName = `${this.props.unitType} ${this.props.testLevel} ${this.props.testType} Test - ${this.props.date}`;
        this.setState({testName});
    }

    // Closes the test save modal and submits the completed test to the server
    submitTest = () => {
        this.setState({testSaveModal: false}, () => {
            let newTest = {
                test_name: this.state.testName,
                versions: this.props.testVersions
            }

            this.props.saveNewTest(newTest);
        })
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
                    nextButtonID='saveTestButton' nextButtonText='Save Test'
                    isNextButtonDisabled={false}
                    clickHandler={(event) => this.handleClickEvent(event)}/>
                <TestSaveModal modal={this.state.testSaveModal} toggle={this.toggleSaveTestModal}
                    testName={this.state.testName}
                    inputChange={(event) => this.handleInputChange(event)}
                    clickHandler={(event) => this.handleClickEvent(event)}/>
            </div> 
        );
    }
}

export default GenerateTest;