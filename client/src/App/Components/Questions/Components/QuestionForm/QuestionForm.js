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

        let inputValidity = {
            isQuestionTypeValid: null,
            isQuestionDescriptionValid: null,
            isCorrectAnswerValid: null,
            isAnswerAValid: null,
            isAnswerBValid: null,
            isAnswerCValid: null,
            isGunneryTableValid: null,
            isTopicValid: null
        };

        if (props.data) {
            let gunneryTable = props.data.gunnery_table.map(entry => {
                return {
                    unitType: entry.unit_type,
                    testType: entry.test_type,
                    table: entry.table,
                    subtask: entry.subtask
                };
            });

            this.initialState = {
                _id: props.data._id,
                questionType: props.data.question_type,
                questionDescription: props.data.question_description,
                correctAnswer: props.data.correct_answer,
                answerA: props.data.answer_a || '',
                answerB: props.data.answer_b || '',
                answerC: props.data.answer_c || '',
                gunneryTable,
                topic: props.data.topic,
                inputValidity
            };
        } else {
            this.initialState = {
                questionType: 'Multiple Choice',
                questionDescription: '',
                correctAnswer: '',
                answerA: '',
                answerB: '',
                answerC: '',
                gunneryTable: [],
                topic: '',
                inputValidity
            };
        }

        this.state = this.initialState;
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;
        this.setState({[id]: value});

        // If the question type is changed, the correct answer field will be cleared
        if (id === 'questionType') {
            this.setState({correctAnswer: '', answerA: '', answerB: '', answerC: ''});
        }
    };

    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
        } else {
            if (this.isAllInputValid()) {
                if (event.target.id === 'submitButton') {
                    this.props.submitEvent(this.state);
                } else if (event.target.id === 'updateButton') {
                    this.props.updateEvent(this.state);
                } else if (event.target.id === 'deleteButton') {
                    this.props.deleteEvent(this.state);
                }
            }
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
                    inputChange={(event) => this.handleInputChange(event)}
                    isValid={this.state.inputValidity.isCorrectAnswerValid}
                    errorMessage={'Please select either \'True\' or \'False\''}/>
            );
        } else {
            return (
                <TextField label="Correct Answer"id="correctAnswer" type="text"
                    value={this.state.correctAnswer}
                    inputChange={(event) => this.handleInputChange(event)}
                    isValid={this.state.inputValidity.isCorrectAnswerValid}
                    errorMessage={'The \'Correct Answer\' field is required!'}/>
            );
        }
    };

    // Return the update button if an updateEvent function was passed in
    getUpdateButton = () => {
        if (this.props.updateEvent) {
            return (
                <button className="btn btn-info" id="updateButton"
                    onClick={(event) => this.handleClickEvent(event)}>Apply Question Changes</button>
            );
        }
    }

    checkMultipleChoice = () => {
        if (this.state.questionType === 'Multiple Choice') {
            return (
                <div className="border border-muted rounded p-3">
                    <small id="multChoiceAnswerLabel" className="form-text">Input the incorrect answer options below:</small>
                    <TextField label="Answer A"id="answerA" type="text"
                        value={this.state.answerA}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isAnswerAValid}
                        errorMessage={'The \'Answer A\' field is required!'}/>
                    <TextField label="Answer B"id="answerB" type="text"
                        value={this.state.answerB}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isAnswerBValid}
                        errorMessage={'The \'Answer B\' field is required!'}/>
                    <TextField label="Answer C"id="answerC" type="text"
                        value={this.state.answerC}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isAnswerCValid}
                        errorMessage={'The \'Answer C\' field is required!'}/>
                </div>
            );
        }
    };

    isAllInputValid = () => {
        let validQuestionTypes = ['Multiple Choice', 'True or False', 'Fill-in-the-Blank'];
        let isQuestionTypeValid = (validQuestionTypes.includes(this.state.questionType) ? true : false );
        let isQuestionDescriptionValid = (this.state.questionDescription.length > 9  ? true : false);
        let isCorrectAnswerValid = (this.state.correctAnswer.length > 0 ? true : false);
        let isGunneryTableValid = (this.state.gunneryTable.length > 0 ? true : false);
        let isTopicValid = (this.state.topic.length > 0 ? true : false);

        let isAnswerAValid, isAnswerBValid, isAnswerCValid;
        if (this.state.questionType === 'Multiple Choice') {
            isAnswerAValid = (this.state.answerA.length > 0 ? true : false);
            isAnswerBValid = (this.state.answerB.length > 0 ? true : false);
            isAnswerCValid = (this.state.answerC.length > 0 ? true : false);
        }

        let inputValidity = {
            isQuestionTypeValid,
            isQuestionDescriptionValid,
            isCorrectAnswerValid,
            isAnswerAValid,
            isAnswerBValid,
            isAnswerCValid,
            isGunneryTableValid,
            isTopicValid
        };

        let isAllValid = (isQuestionTypeValid !== false && isQuestionDescriptionValid !== false &&
            isCorrectAnswerValid !== false && isAnswerAValid !== false && isAnswerBValid !== false &&
            isAnswerCValid !== false && isGunneryTableValid !== false && isTopicValid !== false);
        
        this.setState({inputValidity});
        return isAllValid;
    };

    render() {
        // Format the correct answer field based on the question type
        let correctAnswerField = this.getCorrectAnswerField();

        // Render additional answer fields if question is Multiple Choice
        let multChoiceAnswers = this.checkMultipleChoice();

        // Render additional "update" button if the operator just wants to update passed in information
        let updateButton = this.getUpdateButton();

        return(
            <form className="card bg-light" noValidate>
                <h1 className="card-header">{this.props.title}</h1>
                <div className="p-4">
                    <SelectBox label="Question Type" id="questionType"
                        options={['Multiple Choice', 'Fill-in-the-Blank', 'True or False']}
                        value={this.state.questionType}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isQuestionTypeValid}
                        errorMessage='You must select the question type!'/>
                    <TextArea label="Question Description" id="questionDescription" type="text" rows="4"
                        value={this.state.questionDescription}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isQuestionDescriptionValid}
                        errorMessage='The question description must be at least 10 characters!'/>
                    {correctAnswerField}
                    {multChoiceAnswers}
                    <GunneryTableModal buttonLabel='Add Gunnery Table/Subtask'
                        updateGunneryList={(newEntry) => this.updateGunneryList(newEntry)}/>
                    <GunneryList list={this.state.gunneryTable}
                        deleteEntry={(index) => this.deleteGunneryListEntry(index)}
                        isValid={this.state.inputValidity.isGunneryTableValid}
                        errorMessage={'You must select at least one applicable Gunnery Table/Subtask!'}/>
                    <TextField label="Topic"id="topic" type="text"
                        value={this.state.topic}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isTopicValid}
                        errorMessage={'The \'Topic\' field is required!'}/>
                </div>
                <div className="card-footer">
                    {updateButton}
                    <FormButtons submitButtonID={'submitButton'}
                        submitButtonText={this.props.submitButtonText} 
                        cancelButtonID={'clearAllButton'}
                        cancelButtonText={this.props.cancelButtonText}
                        deleteButtonID={'deleteButton'}
                        deleteButtonText={this.props.deleteButtonText}
                        clickHandler={(event) => this.handleClickEvent(event)}/>
                </div>
            </form> 
        );
    }
}

export default QuestionForm;