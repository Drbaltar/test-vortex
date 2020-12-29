/*
*  This module serves as a React Component that acts as the input
*  form for a user to input a new application or question issue
*/

import React, { Component } from 'react';

import SelectBox from '../../../shared-components/SelectBox';
import TextArea from '../../../shared-components/TextArea';
import ErrorMessage from '../../../shared-components/ErrorMessage';
import FormButtons from '../../../shared-components/FormButtons';

class IssueForm extends Component {

    constructor (props) {
        super(props);

        this.applicationCategories = [
            '',
            'Application Crash',
            'Entry/List Not Populating Information',
            'Incorrect Information/Description',
            'Incorrect Spelling/Terminology',
            'Server Error',
            'Request New Feature',
            'Recommend Application Change',
            'Other'
        ];
    
        this.questionCategories = [
            '',
            'Incorrect Question Information',
            'Outdated Information',
            'Incorrect Answer',
            'Other'
        ];

        this.initialState = {
            issueType: '',
            issueCategory: '',
            issueDescription: '',
            questionID: '',
            inputValidity: {
                isIssueTypeValid: null,
                isIssueCategoryValid: null,
                isIssueDescriptionValid: null,
                isQuestionIDValid: null
            }
        };

        this.state = this.initialState;
    }

    handleInputChange = (event) => {
        const {target: { id, value}} = event;

        if (id === 'issueType') {
            this.setState({[id]: value, issueCategory: ''});
        } else {
            this.setState({[id]: value});
        }
    }

    handleClickEvent = (event) => {
        event.preventDefault();

        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
            this.props.clearErrorMessage();
        } else if (event.target.id === 'submitButton' && this.isAllInputValid()) {
            this.props.submitEvent(this.getDataToSubmit());
        }
    }

    getIssueCategories = () => {
        if (this.state.issueType === 'Application Issue') {
            return this.applicationCategories;
        } else if (this.state.issueType === 'Question Issue') {
            return this.questionCategories;
        } else {
            return [];
        }
    }

    isAllInputValid = () => {
        let inputValidity = this.getInputValidity();
        this.setState({ inputValidity });

        for (const entry in inputValidity) {
            if (!inputValidity[entry]) {
                return false;
            }
        }

        return true;
    };

    getInputValidity = () => {
        return {
            isIssueTypeValid: this.state.issueType.length > 0 ? true : false,
            isIssueCategoryValid: this.state.issueCategory.length > 0 ? true : false,
            isIssueDescriptionValid: this.state.issueDescription.length > 9  ? true : false,
        };
    };

    getDataToSubmit = () => {
        let data =  {
            issue_type: this.state.issueType,
            issue_category: this.state.issueCategory,
            issue_description: this.state.issueDescription
        };

        if(this.state.questionID !== '') {
            data.question_id = this.state.questionID;
        }

        return data;
    }

    getErrorMessage = () => {
        if (this.props.errorMessage !== '') {
            return (<ErrorMessage message={this.props.errorMessage}/>);
        }
    }

    render() {
        return(
            <form className="card bg-light">
                <h1 className="card-header">Submit New Issue</h1>
                <div className="p-4">
                    <SelectBox label="Issue Type" id="issueType"
                        options={['', 'Application Issue', 'Question Issue']}
                        value={this.state.issueType}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isIssueTypeValid}
                        errorMessage='You must select the issue type!'/>
                    <SelectBox label="Issue Category" id="issueCategory"
                        options={this.getIssueCategories()}
                        value={this.state.issueCategory}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isIssueCategoryValid}
                        errorMessage='You must select the issue category!'/>
                    <TextArea label="Issue Description" id="issueDescription" type="text" rows="4"
                        value={this.state.issueDescription}
                        inputChange={(event) => this.handleInputChange(event)}
                        isValid={this.state.inputValidity.isIssueDescriptionValid}
                        errorMessage='The issue description must be at least 10 characters!'/>
                    {/* question_id */}
                </div>
                {this.getErrorMessage()}
                <div className="card-footer">
                    <FormButtons submitButtonID={'submitButton'}
                        submitButtonText="Submit" 
                        cancelButtonID={'clearAllButton'}
                        cancelButtonText="Clear All"
                        clickHandler={(event) => this.handleClickEvent(event)}/>
                </div>
            </form>
        );
    }
}

export default IssueForm;