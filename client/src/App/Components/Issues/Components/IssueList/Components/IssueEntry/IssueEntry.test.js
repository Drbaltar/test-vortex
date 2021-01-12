import React from 'react';
import { shallow } from 'enzyme';
import IssueEntry from './IssueEntry';

describe('IssueEntry', () => {
    const testEntry = {
        issue_type: 'Application Issue',
        issue_category: 'Application Crash',
        issue_description: 'The application keeps crashing!',
        submitted_by: 'kmccain'
    };
    const testIndex = 5;
    const mockSelect = jest.fn();

    const wrapper = shallow(<IssueEntry issue={testEntry} select={mockSelect} index={testIndex}/>);
    const listEntryProps = wrapper.find('ListEntry').prop('entryFields');

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('passes the proper number of fields to ListEntry', () => {
        expect(listEntryProps.length).toBe(4);
    });

    it('passes the Issue Type label and field correctly', () => {
        expect(listEntryProps[0].label).toBe('Issue Type:');
        expect(listEntryProps[0].field).toBe(testEntry.issue_type);
    });

    it('passes the Issue Category label and field correctly', () => {
        expect(listEntryProps[1].label).toBe('Issue Category:');
        expect(listEntryProps[1].field).toBe(testEntry.issue_category);
    });

    it('passes the Issue Description label and field correctly', () => {
        expect(listEntryProps[2].label).toBe('Issue Description:');
        expect(listEntryProps[2].field).toBe(testEntry.issue_description);
    });

    it('passes the Submitted By label and field correctly', () => {
        expect(listEntryProps[3].label).toBe('Submitted By:');
        expect(listEntryProps[3].field).toBe(testEntry.submitted_by);
    });

    describe('when the Issue Entry is selected', () => {
        beforeAll(() => {
            expect(wrapper.find('.btn').simulate('click'));
        });

        it('the select function should be called with the index', () => {
            expect(mockSelect).toHaveBeenCalledWith(testIndex);
        });
    });
});