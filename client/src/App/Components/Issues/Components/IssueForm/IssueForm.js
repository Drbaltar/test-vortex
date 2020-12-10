/*
*  This module serves as a React Component that acts as the input
*  form for a user to input a new application or question issue
*  Author: Kyle McCain
*  Date: 3 September 2020
*/

// Import React module
import React from 'react';

// Import child components
import SelectBox from '../../../shared-components/SelectBox';
import TextArea from '../../../shared-components/TextArea';
import FormButtons from '../../../shared-components/FormButtons';
import ErrorMessage from '../../../shared-components/ErrorMessage';

// Define new IssueForm class that holds state for input data of new issue
class IssueForm extends React.Component {
    constructor (props) {
        super(props);

        let inputValidity = {
            isIssueTypeValid: null,
            isIssueCategoryValid: null,
            isIssueDescriptionValid: null,
            isQuestionIDValid: null
        }

        this.initialState = {
            issueType: '',
            issueCategory: '',
            issueDescription: '',
            questionID: '',
            inputValidity
        }

        this.state = this.initialState;
    }

    // Handle form input changes
    handleInputChange = (event) => {
        const {target: { id, value}} = event;

        if (id === 'issueType') {
            this.setState({[id]: value, issueCategory: ''})
        } else {
            this.setState({[id]: value});
        }
    };

    // Handle form click events
    handleClickEvent = (event) => {
        event.preventDefault();
        if (event.target.id === 'clearAllButton') {
            this.setState(this.initialState);
            this.props.clearErrorMessage();
        } else {
            if (this.isAllInputValid()) {
                if (event.target.id === 'submitButton') {
                    this.props.submitEvent(this.getDataToSubmit());
                }
            }
        }
    }

    // Returns the applicable array of categories based on issue type
    getIssueCategories = () => {
        // Create array of application categories
        let applicationCategories = [
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

        // Create array of question categories
        let questionCategories = [
            '',
            'Incorrect Question Information',
            'Outdated Information',
            'Incorrect Answer',
            'Other'
        ];

        if (this.state.issueType === 'Application Issue') {
            return applicationCategories;
        } else if (this.state.issueType === 'Question Issue') {
            return questionCategories;
        } else {
            return [];
        }
    }

    // // Returns field to input question ID
    // getQuestionIDField = () => {

    // }

    // Check to see if all input form entries are valid
    isAllInputValid = () => {
        let isIssueTypeValid = (this.state.issueType.length > 0 ? true : false);
        let isIssueCategoryValid = (this.state.issueCategory.length > 0 ? true : false);
        let isIssueDescriptionValid = (this.state.issueDescription.length > 9  ? true : false);

        let inputValidity = {
            isIssueTypeValid,
            isIssueCategoryValid,
            isIssueDescriptionValid,
        };

        let isAllValid = true;

        // Check all validity flags to see if any are false and update overall flag
        for (const entry in inputValidity) {
            if (!inputValidity[entry]) {
                isAllValid = false;
                break;
            }
        }
        
        this.setState({inputValidity});

        return isAllValid;
    };

    getDataToSubmit = () => {
        let data =  {
            issue_type: this.state.issueType,
            issue_category: this.state.issueCategory,
            issue_description: this.state.issueDescription
        }

        if(this.state.questionID !== '') {
            data.question_id = this.state.questionID
        }

        return data;
    }

    getErrorMessage = () => {
        if (this.props.errorMessage !== '') {
            return (<ErrorMessage message={this.props.errorMessage}/>)
        }
    }

    // Render component
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
        )
    }
}

export default IssueForm;