import React from 'react';
import Axios from 'axios'
import TextField from './Components/TextField';
import TextArea from './Components/TextArea';
import SelectBox from './Components/SelectBox';
import FormButtons from './Components/FormButtons';
import './InputForm.css';

class InputForm extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            questionType: 'Multiple Choice',
            questionDescription: '',
            correctAnswer: '',
            answerA: '',
            answerB: '',
            answerC: '',
            testType: 'Tactics',
            topic: '',
            table: '', 
            subtask: ''
        }

        this.state = this.initialState;
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value});        
    };

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
        } else if (event.target.id === 'submitButton') {
            fetch('/api/questions/submit', {
                    method: 'POST',
                    body: this.state
            })
            .then(response => console.log(response))

            // const response = await Axios.post(
            //     'http://localhost:5000/api/questions/submit'
            //     );

            // console.log(response);
            
        }
    }

    checkMultipleChoice = () => {
        if (this.state.questionType === 'Multiple Choice') {
            return(
                <div className="border border-dark rounded p-3">
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
        // Render additional answer fields if question is Multiple Choice
        let multChoiceAnswers = this.checkMultipleChoice();

        return(
            <form className="card bg-light m-10">
                <h1 className="card-header">Add New Question</h1>
                    <div className="p-4">
                        <SelectBox label="Question Type" id="questionType"
                            options={['Multiple Choice', 'Fill-in-the-Blank', 'True or False']}
                            value={this.state.questionType}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextArea label="Question Description" id="questionDescription" type="text" rows="4"
                            value={this.state.questionDescription}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextField label="Correct Answer"id="correctAnswer" type="text"
                            value={this.state.correctAnswer}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        {multChoiceAnswers}
                        <SelectBox label="Test Type" id="testType"
                            options={['Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Launcher', 'Tactics/Communications']}
                            value={this.state.testType}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextField label="Topic"id="topic" type="text"
                            value={this.state.topic}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextField label="Gunnery Table"id="table" type="text"
                            value={this.state.table}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextField label="Table Subtask"id="subtask" type="text"
                            value={this.state.subtask}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <FormButtons clickHandler={(event) => this.handleClickEvent(event)}/>
                    </div>
            </form> 
        )
    }
}

export default InputForm;