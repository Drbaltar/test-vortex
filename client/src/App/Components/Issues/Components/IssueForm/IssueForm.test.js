import { shallow } from 'enzyme';
import React from 'react';

import IssueForm from './IssueForm';

class TestFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

const applicationCategories = [
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

const questionCategories = [
    '',
    'Incorrect Question Information',
    'Outdated Information',
    'Incorrect Answer',
    'Other'
];

const initialState = {
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

const testData = {
    issue_type: 'Application Issue',
    issue_category: 'Application Crash',
    issue_description: 'The Application is crashing',
    question_id: ''
};

const testTitle = 'Edit Issue';

describe('IssueForm', () => {
    const wrapper = shallow(<IssueForm title={testTitle}><TestFooter /></IssueForm>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets the application categories to the correct entries', () => {
        expect(wrapper.instance().applicationCategories).toEqual(applicationCategories);
    });

    it('sets the question categories to the correct entries', () => {
        expect(wrapper.instance().questionCategories).toEqual(questionCategories);
    });

    it('sets the initial state to the correct values', () => {
        expect(wrapper.state()).toEqual(initialState);
    });

    describe('when there is data that is passed to the form', () => {
        const formWithData = shallow(<IssueForm data={testData}><TestFooter /></IssueForm>);

        it('sets the state values to the correct entries', () => {
            expect(formWithData.state()).toEqual(expect.objectContaining({
                issueType: testData.issue_type,
                issueCategory: testData.issue_category,
                issueDescription: testData.issue_description,
                questionID: testData.question_id
            }));
        });
    });

    it('renders the BodyCard component for the form', () => {
        expect(wrapper.find('BodyCard').exists()).toBe(true);
    });

    it('sets the BodyCard title to the passed in title prop', () => {
        expect(wrapper.find('BodyCard').prop('title')).toEqual(testTitle);
    });

    it('passes the issueType field to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').childAt(0).childAt(0).prop('id')).toEqual('issueType');
    });

    it('passes the issueCategory field to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').childAt(0).childAt(1).prop('id')).toEqual('issueCategory');
    });

    it('passes the issueDescription field to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').childAt(0).childAt(2).prop('id')).toEqual('issueDescription');
    });

    it('passes the footer component to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').childAt(1).name()).toEqual('TestFooter');
    });

    it('renders the issue type field', () => {
        expect(wrapper.find('#issueType').exists()).toBe(true);
    });

    it('passes the correct props to the issue type field', () => {
        expect(wrapper.find('#issueType').props()).toEqual({
            label: 'Issue Type',
            id: 'issueType',
            options: ['', 'Application Issue', 'Question Issue'],
            value: wrapper.state().issueType,
            inputChange: expect.any(Function),
            isValid: wrapper.state().inputValidity.isIssueTypeValid,
            errorMessage: 'You must select the issue type!'
        });
    });

    it('renders the issue category field', () => {
        expect(wrapper.find('#issueCategory').exists()).toBe(true);
    });

    it('passes the correct props to the issue category field', () => {
        expect(wrapper.find('#issueCategory').props()).toEqual({
            label: 'Issue Category',
            id: 'issueCategory',
            options: [],
            value: wrapper.state().issueCategory,
            inputChange: expect.any(Function),
            isValid: wrapper.state().inputValidity.isIssueCategoryValid,
            errorMessage: 'You must select the issue category!'
        });
    });

    describe('when the issue type field is set to `Application Issue`', () => {
        beforeAll(() => {
            wrapper.setState({ issueType: 'Application Issue' });
        });

        it('sets the issue category field options to the applicable options', () => {
            expect(wrapper.find('#issueCategory').prop('options')).toEqual(applicationCategories);
        });

        afterAll(() => {
            wrapper.setState({ issueType: '' });
        });
    });

    describe('when the issue type field is set to `Question Issue`', () => {
        beforeAll(() => {
            wrapper.setState({ issueType: 'Question Issue' });
        });

        it('sets the issue category field options to the applicable options', () => {
            expect(wrapper.find('#issueCategory').prop('options')).toEqual(questionCategories);
        });

        afterAll(() => {
            wrapper.setState({ issueType: '' });
        });
    });

    it('renders the question description field', () => {
        expect(wrapper.find('#issueDescription').exists()).toBe(true);
    });

    it('does not render the error message when errorMessage is not a passed in prop', () => {
        expect(wrapper.find('ErrorMessage').exists()).toBe(false);
    });
});