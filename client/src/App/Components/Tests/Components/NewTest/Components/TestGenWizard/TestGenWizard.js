import React from 'react';
import Axios from 'axios';

import TestParameters from './Components/TestParameters/TestParameters';
import QuestionSelectionMethod from './Components/QuestionSelectionMethod/QuestionSelectionMethod';
import QuestionReview from './Components/QuestionReview/QuestionReview';
import GenerateTest from './Components/GenerateTest/GenerateTest';
import './TestGenWizard.css';

class TestGenWizard extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isTestTypeComplete: false,
            isSelectionMethodComplete: false,
            isQuestionReviewComplete: false,
            tabDisplayed: 1,
            unitType: '',
            testLevel: '',
            testType: '',
            numberOfQuestions: 50,
            minQuestions: 0,
            maxQuestions: 100,
            createVersionB: false,
            percentAlternateQuestions: 0,
            questionSelection: '',
            loadingQuestions: false,
            hasSearchRan: false,
            testQuestions: [],
            testVersions: []
        };

        this.state = this.initialState;
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;

        this.setState({[id]: value}, () => {
            if (id === 'testLevel' && value !== '') {
                this.setMinMaxQuestions();
            }

            if ((id === 'unitType' && this.state.testType !== '') || (id === 'testLevel' && this.state.testType !== '')) {
                this.setState({ testType: ''});
            }
        });

    };

    handleCheckboxChange = (event) => {
        const {target: { id, checked}} = event;

        this.setState({[id]: checked});
    };

    handleRadioSelection = (event) => {
        const {target: { name, value}} = event;
        
        if (name === 'selectionMethodRadio') {
            this.setState({questionSelection: value});
            return;
        }
    }

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'nextButton') {
            if (this.isCurrentTabCompleted()) {
                this.setState({tabDisplayed: (this.state.tabDisplayed + 1)});
            }
        } else if (event.target.id === 'previousButton') {
            this.setState({tabDisplayed: (this.state.tabDisplayed - 1)});
        }
    };

    // Returns true if all entries on current tab are completed
    isCurrentTabCompleted = () => {
        switch (this.state.tabDisplayed) {
        case 1:
            if (this.state.unitType !== '' && this.state.testLevel !== '' && this.state.testType !== '') {
                this.setState({isTestTypeComplete: true});
                return true;
            } else {
                return false;
            }
        case 2:
            this.setState({isSelectionMethodComplete: true}, this.getTestQuestionsAuto());
            return true;
        case 3:
            this.createVersions();
            this.setState({isQuestionReviewComplete: true});
            return true;
        default:
            return true;
        }
    }

    // Sets the variables for minimum, maximum and selected number of questions based on the test level
    setMinMaxQuestions = () => {
        if (this.state.testLevel === 'Table IV') {
            this.setState({minQuestions: 25, maxQuestions: 50, numberOfQuestions: 25});
        } else if (this.state.testLevel === 'Table VIII') {
            this.setState({minQuestions: 50, maxQuestions: 100, numberOfQuestions: 50});
        }
    }

    // Requests the test questions based on automatic question selection
    getTestQuestionsAuto = () => {
        this.setState({loadingQuestions: true});

        Axios.get(`/api/tests/new-patriot-auto?unitType=${this.state.unitType}` +
            `&testType=${this.state.testType}&testLevel=${this.state.testLevel}` +
            `&numberOfQuestions=${this.state.numberOfQuestions}`)
            .then((response) => this.setState({testQuestions: response.data, loadingQuestions: false, hasSearchRan: true}));
    }

    createVersions = () => {
        let versionA = this.shuffleArray(this.state.testQuestions.slice(0));
        let versionB = this.shuffleArray(this.state.testQuestions.slice(0));

        this.setState({testVersions: [versionA, versionB]});
    }

    shuffleArray = (array) => {
        for (let i = 0; i < array.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    render() {
        // Used to set the appropriate wizard tabs as disabled, complete or active
        let typeStatus, selectionStatus, reviewStatus, generateStatus;

        if (!this.state.isTestTypeComplete) {
            typeStatus = '';
            selectionStatus = 'disabled';
            reviewStatus = 'disabled';
            generateStatus = 'disabled';
        } else if (!this.state.isSelectionMethodComplete) {
            typeStatus = 'list-group-item-success';
            selectionStatus = '';
            reviewStatus = 'disabled';
            generateStatus = 'disabled';
        } else if (!this.state.isQuestionReviewComplete) {
            typeStatus = 'list-group-item-success';
            selectionStatus = 'list-group-item-success';
            reviewStatus = '';
            generateStatus = 'disabled';
        } else {
            typeStatus = 'list-group-item-success';
            selectionStatus = 'list-group-item-success';
            reviewStatus = 'list-group-item-success';
            generateStatus = '';
        }

        // Sets the tab pane to the appropriate display based on which tab is selected
        let selectedTabPane;
        switch (this.state.tabDisplayed) {
        case 1:
            typeStatus = typeStatus + ' selected';
            selectedTabPane = (
                <TestParameters unitType={this.state.unitType} testLevel={this.state.testLevel}
                    testType={this.state.testType}
                    inputChange={(event) => this.handleInputChange(event)}
                    clickHandler={(event) => this.handleClickEvent(event)}/>
            );
            break;
        case 2:
            selectionStatus = selectionStatus + ' selected';
            selectedTabPane = (<QuestionSelectionMethod numberOfQuestions={this.state.numberOfQuestions}
                minQuestions={this.state.minQuestions} maxQuestions={this.state.maxQuestions}
                createVersionB={this.state.createVersionB}
                percentAlternateQuestions={this.state.percentAlternateQuestions}
                questionSelection={this.state.questionSelection}
                inputChange={(event) => this.handleInputChange(event)}
                checkboxChange={(event) => this.handleCheckboxChange(event)}
                radioChange={(event) => this.handleRadioSelection(event)} 
                clickHandler={(event) => this.handleClickEvent(event)}/>
            );
            break;
        case 3:
            reviewStatus = reviewStatus + ' selected';
            selectedTabPane = <QuestionReview loadingQuestions={this.state.loadingQuestions}
                hasSearchRan={this.state.hasSearchRan}
                testQuestions={this.state.testQuestions}
                clickHandler={(event) => this.handleClickEvent(event)}/>;
            break;
        case 4:
            generateStatus = generateStatus + ' selected';
            selectedTabPane = <GenerateTest unitType={this.state.unitType} testLevel={this.state.testLevel}
                testType={this.state.testType} testVersions={this.state.testVersions}
                clickHandler={(event) => this.handleClickEvent(event)}/>;
            break;
        default:
            typeStatus = typeStatus + ' selected';
            selectedTabPane = (
                <TestParameters unitType={this.state.unitType} testLevel={this.state.testLevel}
                    testType={this.state.testType}
                    inputChange={(event) => this.handleInputChange(event)}
                    clickHandler={(event) => this.handleClickEvent(event)}/>
            );
        }

        return(
            <form className="card bg-light" noValidate>
                <h1 className="card-header">{this.props.title}</h1>
                <div className="pt-4 pl-4 pr-4">
                    <ul className="list-group list-group-horizontal row">
                        <li className={`list-group-item btn col ${typeStatus}`} 
                            onClick={() => this.setState({ tabDisplayed: 1 })}>
                            {`Test Type/Parameters${this.state.isTestTypeComplete ? ' \u2713' : ''}`}
                        </li>
                        <li className={`list-group-item btn col ${selectionStatus}`}
                            onClick={() => this.setState({ tabDisplayed: 2 })}>
                            {`Question Selection Method${this.state.isSelectionMethodComplete ? ' \u2713' : ''}`}
                        </li>
                        <li className={`list-group-item btn col ${reviewStatus}`}
                            onClick={() => this.setState({ tabDisplayed: 3 })}>
                            {`Question Review${this.state.isQuestionReviewComplete ? ' \u2713' : ''}`}
                        </li>
                        <li className={`list-group-item btn col ${generateStatus}`}
                            onClick={() => this.setState({ tabDisplayed: 4 })}>
                                Save/Generate Test
                        </li>
                    </ul>

                </div>
                {selectedTabPane}
            </form> 
        );
    }
}

export default TestGenWizard;