import React from 'react';
import { shallow } from 'enzyme';
import NewIssue from '../NewIssue/NewIssue';

describe('NewIssue', () => {
    const wrapper = shallow(<NewIssue>

    </NewIssue>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the SubmissionBody component', () => {
        expect(wrapper.find('SubmissionBody').exists()).toBe(true);
    });

    it('passes the IssueForm component to the SubmissionBody component', () => {
        expect(wrapper.find('SubmissionBody').children().name()).toEqual('IssueForm');
    });
    
    it('passes the title prop to the IssueForm component', () => {
        expect(wrapper.find('IssueForm').prop('title')).toEqual('Submit New Issue');
    });

    it('passes the FormButtons component to the IssueForm component', () => {
        expect(wrapper.find('IssueForm').children().name()).toEqual('FormButtons');
    });

    it('passes the submit button prop to the FormButtons component', () => {
        expect(wrapper.find('FormButtons').prop('submit')).toEqual(true);
    });

    it('passes the clear all button text prop to the FormButtons component', () => {
        expect(wrapper.find('FormButtons').prop('cancelButtonText')).toEqual('Clear All');
    });

    it('passes the clear all button id to the FormButtons component', () => {
        expect(wrapper.find('FormButtons').prop('cancelButtonID')).toEqual('clearAllButton');
    });
});