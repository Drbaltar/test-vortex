import React from 'react';
import TextField from '../../../shared-components/TextField';
import TextArea from '../../../shared-components/TextArea';
import SelectBox from '../../../shared-components/SelectBox';
import FormButtons from '../../../shared-components/FormButtons';
import GunneryTableModal from './Components/PatriotGunneryModal/PatriotGunneryModal';
import GunneryList from './Components/GunneryList';
import './QuestionForm.css';

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            questionType: 'Multiple Choice',
            questionDescription: '',
            correctAnswer: '',
            answerA: '',
            answerB: '',
            answerC: '',
            testType: '',
            gunneryTable: [],
            topic: ''
        }

        this.state = this.initialState;
    };

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value});

        // If the question type is changed, the correct answer field will be cleared
        if (id === 'questionType') {
            this.setState({correctAnswer: ''});
        }
    };

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
        } else if (event.target.id === 'submitButton') {
            this.props.submitEvent(this.state);
        }
    };

    updateGunneryList = (newEntry) => {
        let newState = this.state.gunneryTable.slice(0);

        newState.push(newEntry);
        this.setState({gunneryTable: newState});
    };

    deleteGunneryListEntry = (index) => {
        let newState = this.state.gunneryTable.slice(0);

        newState.splice(index, 1);
        this.setState({gunneryTable: newState});
    };

    // Return the appropriate correct answer field based on the type of question
    getCorrectAnswerField = () => {
        if (this.state.questionType === 'True or False') {
            return (
                <SelectBox label="Correct Answer"id="correctAnswer"
                    options={['', 'True', 'False']}
                    value={this.state.correctAnswer}
                    inputChange={(event) => this.handleInputChange(event)}/>
            )
        } else {
            return (
                <TextField label="Correct Answer"id="correctAnswer" type="text"
                    value={this.state.correctAnswer}
                    inputChange={(event) => this.handleInputChange(event)}/>
            )
        }
    };

    checkMultipleChoice = () => {
        if (this.state.questionType === 'Multiple Choice') {
            return(
                <div className="border border-muted rounded p-3">
                    <small id="multChoiceAnswerLabel" className="form-text">Input the incorrect answer options below:</small>
                    <TextField label="Answer A"id="answerA" type="text"
                        value={this.state.answerA}
                        inputChange={(event) => this.handleInputChange(event)}/>
                    <TextField label="Answer B"id="answerB" type="text"
                        value={this.state.answerB}
                        inputChange={(event) => this.handleInputChange(event)}/>
                    <TextField label="Answer C"id="answerC" type="text"
                        value={this.state.answerC}
                        inputChange={(event) => this.handleInputChange(event)}/>
                </div>
            )
        };
    };

    render() {
        // Format the correct answer field based on the question type
        let correctAnswerField = this.getCorrectAnswerField();

        // Render additional answer fields if question is Multiple Choice
        let multChoiceAnswers = this.checkMultipleChoice();

        return(
            <form className="card bg-light" noValidate>
                <h1 className="card-header">{this.props.title}</h1>
                    <div className="p-4">
                        <SelectBox label="Question Type" id="questionType"
                            options={['Multiple Choice', 'Fill-in-the-Blank', 'True or False']}
                            value={this.state.questionType}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextArea label="Question Description" id="questionDescription" type="text" rows="4"
                            value={this.state.questionDescription}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        {correctAnswerField}
                        {multChoiceAnswers}
                        <GunneryTableModal buttonLabel='Add Gunnery Table/Subtask'
                            updateGunneryList={(newEntry) => this.updateGunneryList(newEntry)}/>
                        <GunneryList list={this.state.gunneryTable}
                            deleteEntry={(index) => this.deleteGunneryListEntry(index)}/>
                        <TextField label="Topic"id="topic" type="text"
                            value={this.state.topic}
                            inputChange={(event) => this.handleInputChange(event)}/>
                    </div>
                <div className="card-footer">
                    <FormButtons clickHandler={(event) => this.handleClickEvent(event)}/>
                </div>
            </form> 
        )
    }
}

export default QuestionForm;