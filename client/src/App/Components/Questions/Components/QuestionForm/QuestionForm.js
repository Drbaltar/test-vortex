import React, { Component, cloneElement } from 'react';

import TextField from '../../../shared-components/TextField';
import SelectBox from '../../../shared-components/SelectBox';
import GunneryTableModal from './Components/PatriotGunneryModal/PatriotGunneryModal';
import GunneryList from './Components/GunneryList';
import TopicCategories from './Components/TopicCategories/TopicCategories';
import './QuestionForm.css';
import BodyCard from '../../../shared-components/BodyCard/BodyCard';
import BaseQuestionFields from './BaseQuestionFields/BaseQuestionFields';
import Axios from 'axios';
import ErrorMessage from '../../../shared-components/ErrorMessage';

class PatriotQuestionForm extends Component {
    constructor(props) {
        super(props);

        this.FormFooter = this.props.children;

        let inputValidity = this.getBlankInputValidity();
        if (props.data)
            this.state = this.getFilledInitialState(inputValidity);
        else
            this.state = this.getBlankInitialState(inputValidity);
    }

    getBlankInitialState(inputValidity) {
        return this.initialState = {
            questionType: 'Multiple Choice',
            questionDescription: '',
            correctAnswer: '',
            answerA: '',
            answerB: '',
            answerC: '',
            gunneryTable: [],
            topic: {
                majorCategory: '',
                subCategory: ''
            },
            inputValidity,
            isTopicLoading: false,
            existingTopicCategories: null
        };
    }

    getFilledInitialState(inputValidity) {
        return this.initialState = {
            _id: this.props.data._id,
            questionType: this.props.data.question_type,
            questionDescription: this.props.data.question_description,
            correctAnswer: this.props.data.correct_answer,
            answerA: this.props.data.answer_a || '',
            answerB: this.props.data.answer_b || '',
            answerC: this.props.data.answer_c || '',
            gunneryTable: this.getInitialGunneryValues(),
            topic: {
                majorCategory: this.props.data.topic.major_category,
                subCategory: this.props.data.topic.sub_category
            },
            inputValidity,
            isTopicLoading: false,
            existingTopicCategories: null
        };
    }

    getInitialGunneryValues() {
        return this.props.data.gunnery_table.map(entry => {
            return {
                unitType: entry.unit_type,
                testType: entry.test_type,
                table: entry.table,
                subtask: entry.subtask
            };
        });
    }

    getBlankInputValidity() {
        return {
            isQuestionTypeValid: null,
            isQuestionDescriptionValid: null,
            isCorrectAnswerValid: null,
            isAnswerAValid: null,
            isAnswerBValid: null,
            isAnswerCValid: null,
            isGunneryTableValid: null,
            isMajorTopicValid: null,
            isSubTopicValid: null
        };
    }

    render() {
        return (
            <BodyCard title={this.props.title}>
                {this.getFormBody()}
                {this.getFormFooter()}
            </BodyCard>
        );
    }

    getFormBody = () => {
        return (
            <div id="issue-form-body">
                {this.getBaseQuestionFields()}
                {this.getGunneryFields()}
                {this.getTopicCategoryFields()}
                {this.props.errorMessage ? this.getErrorMessage() : null}
            </div>
        );
    };

    getBaseQuestionFields = () => {
        return <BaseQuestionFields inputHandler={(e) => this.handleInputChange(e)}
            questionType={this.state.questionType}
            isQuestionTypeValid={this.state.inputValidity.isQuestionTypeValid}
            questionDescription={this.state.questionDescription}
            isQuestionDescriptionValid={this.state.inputValidity.isQuestionDescriptionValid}
            correctAnswer={this.state.correctAnswer}
            isCorrectAnswerValid={this.state.inputValidity.isCorrectAnswerValid}
            answerA={this.state.answerA} isAnswerAValid={this.state.inputValidity.isAnswerAValid}
            answerB={this.state.answerB} isAnswerBValid={this.state.inputValidity.isAnswerBValid}
            answerC={this.state.answerC}
            isAnswerCValid={this.state.inputValidity.isAnswerCValid}/>;
    };

    getGunneryFields() {
        return ([
            <GunneryTableModal buttonLabel="Add Gunnery Table/Subtask"
                updateGunneryList={(newEntry) => this.updateGunneryList(newEntry)}/>,
            <GunneryList list={this.state.gunneryTable}
                deleteEntry={(index) => this.deleteGunneryListEntry(index)}
                isValid={this.state.inputValidity.isGunneryTableValid}
                errorMessage={'You must select at least one applicable Gunnery Table/Subtask!'}/>
        ]);
    }

    getTopicCategoryFields = () => {
        return <TopicCategories topic={this.state.topic}
            existingTopicCategories={this.state.existingTopicCategories}
            isMajorTopicValid={this.state.inputValidity.isMajorTopicValid}
            isSubTopicValid={this.state.inputValidity.isSubTopicValid}
            isTopicLoading={this.state.isTopicLoading}
            inputChange={(event) => this.handleTopicInputChange(event)}
            topicChange={(category, value) => this.handleTopicButtonChange(category, value)}/>;
    };

    getErrorMessage = () => {
        return <ErrorMessage message={this.props.errorMessage}/>;
    };

    getFormFooter = () => {
        return cloneElement(this.FormFooter, {
            clickHandler: (e) => this.handleClickEvent(e),
            cancelButtonText: 'Clear All',
            cancelButtonID: 'clearAllButton'
        });
    };

    handleInputChange = (event) => {
        const {target: {id, value}} = event;
        if (id === 'majorCategory') {
            this.setState({topic: {[id]: value, subCategory: this.state.topic.subCategory}});
            return;
        } else if (id === 'subCategory') {
            this.setState({topic: {majorCategory: this.state.topic.majorCategory, [id]: value,}});
            return;
        }

        this.setState({[id]: value});

        if (id === 'questionType') {
            this.setState({correctAnswer: '', answerA: '', answerB: '', answerC: ''});
        }
    };

    handleClickEvent = (event) => {
        event.preventDefault();

        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
            this.props.clearErrorMessage();
        } else if (this.isAllInputValid()) {
            this.props.submit(event.target.id, this.getSubmissionData());
        }
    };

    handleTopicInputChange = (event) => {
        const {target: {id, value}} = event;

        let topic = this.state.topic;
        topic[id] = value;

        this.setState({topic});
    };

    handleTopicButtonChange = (category, value) => {
        if (category === 'majorCategory') {
            this.setState({topic: {[category]: value, subCategory: ''}});
        } else if (category === 'subCategory') {
            this.setState({topic: {majorCategory: this.state.topic.majorCategory, [category]: value,}});
        }
    };

    updateGunneryList = (newEntry) => {
        let newState = this.state.gunneryTable.slice(0);

        newState.push(newEntry);
        this.setState({gunneryTable: newState}, () => this.getExistingTopics());
    };

    deleteGunneryListEntry = (index) => {
        let newState = this.state.gunneryTable.slice(0);

        newState.splice(index, 1);
        this.setState({gunneryTable: newState}, () => this.getExistingTopics());
    };

    // Return the appropriate correct answer field based on the type of question
    getCorrectAnswerField = () => {
        if (this.state.questionType === 'True or False') {
            return (
                <SelectBox label="Correct Answer" id="correctAnswer"
                    options={['', 'True', 'False']}
                    value={this.state.correctAnswer}
                    inputChange={(event) => this.handleInputChange(event)}
                    isValid={this.state.inputValidity.isCorrectAnswerValid}
                    errorMessage={'Please select either \'True\' or \'False\''}/>
            );
        } else {
            return (
                <TextField label="Correct Answer" id="correctAnswer" type="text"
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
    };

    checkMultipleChoice = () => {
        if (this.state.questionType === 'Multiple Choice') {
            return (
                <div className="border border-muted rounded p-3">
                    <small id="multChoiceAnswerLabel" className="form-text">Input the incorrect answer options
                        below:</small>
                    <TextField label="Answer A" id="answerA" type="text"
                        value={this.state.answerA}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isAnswerAValid}
                        errorMessage={'The \'Answer A\' field is required!'}/>
                    <TextField label="Answer B" id="answerB" type="text"
                        value={this.state.answerB}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isAnswerBValid}
                        errorMessage={'The \'Answer B\' field is required!'}/>
                    <TextField label="Answer C" id="answerC" type="text"
                        value={this.state.answerC}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isAnswerCValid}
                        errorMessage={'The \'Answer C\' field is required!'}/>
                </div>
            );
        }
    };

    getExistingTopics = () => {
        if (this.state.gunneryTable.length === 0) {
            this.setState({existingTopicCategories: null});
        } else {
            this.setState({isTopicLoading: true}, () => {
                Axios.get('/api/questions/patriot/topics', {
                    params: {
                        unitType: this.state.gunneryTable[0].unitType,
                        table: this.state.gunneryTable[0].table, subtask: this.state.gunneryTable[0].subtask
                    }
                })
                    .then((response) => this.setState({existingTopicCategories: response.data, isTopicLoading: false}))
                    .catch((error) => {
                        console.log(error);
                        this.setState({existingTopicCategories: null, isTopicLoading: false});
                    });
            });
        }
    };

    isAllInputValid = () => {
        let validQuestionTypes = ['Multiple Choice', 'True or False', 'Fill-in-the-Blank'];
        let isQuestionTypeValid = (validQuestionTypes.includes(this.state.questionType));
        let isQuestionDescriptionValid = (this.state.questionDescription.length > 9);
        let isCorrectAnswerValid = (this.state.correctAnswer.length > 0);
        let isGunneryTableValid = (this.state.gunneryTable.length > 0);
        let isMajorTopicValid = (this.state.topic.majorCategory.length > 0);
        let isSubTopicValid = (this.state.topic.subCategory.length > 0);

        let isAnswerAValid, isAnswerBValid, isAnswerCValid;
        if (this.state.questionType === 'Multiple Choice') {
            isAnswerAValid = (this.state.answerA.length > 0);
            isAnswerBValid = (this.state.answerB.length > 0);
            isAnswerCValid = (this.state.answerC.length > 0);
        }

        let inputValidity = {
            isQuestionTypeValid,
            isQuestionDescriptionValid,
            isCorrectAnswerValid,
            isAnswerAValid,
            isAnswerBValid,
            isAnswerCValid,
            isGunneryTableValid,
            isMajorTopicValid,
            isSubTopicValid
        };

        let isAllValid = !Object.values(inputValidity).includes(false);

        this.setState({inputValidity});

        return isAllValid;
    };

    getSubmissionData = () => {
        let data = {
            questionType: this.state.questionType,
            questionDescription: this.state.questionDescription,
            correctAnswer: this.state.correctAnswer,
            gunneryTable: this.state.gunneryTable,
            topic: this.state.topic
        };

        if (this.state.questionType === 'Multiple Choice') {
            data.answerA = this.state.answerA;
            data.answerB = this.state.answerB;
            data.answerC = this.state.answerC;
        }

        return data;
    };
}

export default PatriotQuestionForm;