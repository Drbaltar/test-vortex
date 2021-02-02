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

    const wrapper = shallow(<IssueEntry entry={testEntry} select={mockSelect} index={testIndex}/>);
    const listEntryFields = wrapper.find('ListEntry').prop('entryFields');

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('passes the select function to ListEntry', () => {
        expect(wrapper.find('ListEntry').prop('select')).toBe(mockSelect);
    });

    it('passes the index to ListEntry', () => {
        expect(wrapper.find('ListEntry').prop('index')).toEqual(testIndex);
    });

    it('passes the proper number of fields to ListEntry', () => {
        expect(listEntryFields.length).toBe(4);
    });

    it('passes the Issue Type label and field correctly', () => {
        expect(listEntryFields[0].label).toBe('Issue Type:');
        expect(listEntryFields[0].field).toBe(testEntry.issue_type);
    });

    it('passes the Issue Category label and field correctly', () => {
        expect(listEntryFields[1].label).toBe('Issue Category:');
        expect(listEntryFields[1].field).toBe(testEntry.issue_category);
    });

    it('passes the Issue Description label and field correctly', () => {
        expect(listEntryFields[2].label).toBe('Issue Description:');
        expect(listEntryFields[2].field).toBe(testEntry.issue_description);
    });

    it('passes the Submitted By label and field correctly', () => {
        expect(listEntryFields[3].label).toBe('Submitted By:');
        expect(listEntryFields[3].field).toBe(testEntry.submitted_by);
    });

    describe('when the select function is called in the list entry component', () => {
        beforeAll(() => {
            const select = wrapper.find('ListEntry').prop('select');
            select(testIndex);
        });

        it('the select function should be called with the index', () => {
            expect(mockSelect).toHaveBeenCalledWith(testIndex);
        });
    });
});