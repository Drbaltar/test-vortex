import React from 'react';
import TextField from './TextField';
import TextArea from './TextArea';
import SelectBox from './SelectBox';
import FormButtons from './FormButtons';
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
            answerC: ''
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
        let multChoiceAnswers = this.checkMultipleChoice();

        return(
            <form className="card bg-light m-10">
                <h1 className="card-header">Add New Question</h1>
                    <div className="p-4">
                        <SelectBox label="Question Type" id="questionType"
                            options={['Multiple Choice', 'Fill-in-the-Blank', 'True or False']}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextArea label="Question Description" id="questionDescription" type="text" rows="4"
                            value={this.state.questionDescription}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        <TextField label="Correct Answer"id="correctAnswer" type="text"
                            value={this.state.correctAnswer}
                            inputChange={(event) => this.handleInputChange(event)}/>
                        {multChoiceAnswers}
                        <FormButtons clickHandler={(event) => this.handleClickEvent(event)}/>
                    </div>
            </form> 
        )
    }
}

export default InputForm;