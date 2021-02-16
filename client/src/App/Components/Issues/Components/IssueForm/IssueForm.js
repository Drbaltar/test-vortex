import React, { Component } from 'react';

import SelectBox from '../../../shared-components/SelectBox';
import TextArea from '../../../shared-components/TextArea';
import ErrorMessage from '../../../shared-components/ErrorMessage';
import BodyCard from '../../../shared-components/BodyCard/BodyCard';

class IssueForm extends Component {

    constructor (props) {
        super(props);

        this.FormFooter = this.props.children;

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

        if (props.data) {
            this.setFilledInitialState(props.data);
        } else {
            this.setBlankInitialState();
        }

        this.state = this.initialState;
    }

    setFilledInitialState = (data) => {
        this.initialState = {
            issueType: data.issue_type,
            issueCategory: data.issue_category,
            issueDescription: data.issue_description,
            questionID: data.question_id || '',
            inputValidity: {
                isIssueTypeValid: null,
                isIssueCategoryValid: null,
                isIssueDescriptionValid: null,
                isQuestionIDValid: null
            }
        };
    }

    setBlankInitialState = () => {
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
    }

    render() {
        return(
            <BodyCard title={this.props.title}>
                {this.getFormBody()}
                {this.getFormFooter()}
            </BodyCard>
        );
    }

    getFormBody = () => {
        return (
            <div id='issue-form-body'>
                {this.getIssueTypeField()}
                {this.getIssueCategoryField()}
                {this.getIssueDescriptionField()}
                {this.props.errorMessage ? this.getErrorMessage() : null}
            </div>
        );
    }

    getIssueTypeField = () => {
        return (
            <SelectBox label="Issue Type" id="issueType"
                options={['', 'Application Issue', 'Question Issue']}
                value={this.state.issueType}
                inputChange={(event) => this.handleInputChange(event)}
                isValid={this.state.inputValidity.isIssueTypeValid}
                errorMessage='You must select the issue type!'/>
        );
    }

    getIssueCategoryField = () => {
        return (
            <SelectBox label="Issue Category" id="issueCategory"
                options={this.getIssueCategories()}
                value={this.state.issueCategory}
                inputChange={(event) => this.handleInputChange(event)}
                isValid={this.state.inputValidity.isIssueCategoryValid}
                errorMessage='You must select the issue category!'/>
        );
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

    getIssueDescriptionField = () => {
        return (
            <TextArea label="Issue Description" id="issueDescription" type="text" rows="4"
                value={this.state.issueDescription}
                inputChange={(event) => this.handleInputChange(event)}
                isValid={this.state.inputValidity.isIssueDescriptionValid}
                errorMessage='The issue description must be at least 10 characters!'/>
        );
    }

    getErrorMessage = () => {
        return <ErrorMessage message={this.props.errorMessage}/>;
    }

    getFormFooter = () => {
        return React.cloneElement(this.FormFooter, {
            clickHandler: (e) => this.handleClickEvent(e)
        });
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
        } else if (this.isAllInputValid()) {
            this.props.submit(event.target.id, this.getDataToSubmit());
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

        if(this.props.data) {
            data._id = this.props.data._id;
        }

        return data;
    }
}

export default IssueForm;