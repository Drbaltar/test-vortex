import React from 'react';
import { shallow } from 'enzyme';
import QueryList from './QueryList';
import IssueEntry from './Components/IssueEntry/IssueEntry';

const singleEntry = [
    {
        issue_type: 'Application Issue',
        issue_category: 'Application Crash',
        issue_description: 'The application keeps crashing!',
        submitted_by: 'kmccain'
    }
];

const exampleList = [
    {
        issue_type: 'Application Issue',
        issue_category: 'Application Crash',
        issue_description: 'The application keeps crashing!',
        submitted_by: 'kmccain'
    },
    {
        issue_type: 'Application Issue',
        issue_category: 'Entry/List Not Populating Information',
        issue_description: 'The question list is not populating!',
        submitted_by: 'kmccain'
    }
];

const entryType = 'Question';

const mockSelectFunction = jest.fn();

describe('QueryList', () => {
    const wrapper = shallow(<QueryList entryType={entryType}>
        <IssueEntry />
    </QueryList>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('when an empty list is passed in', () => {
        beforeAll(() => {
            wrapper.setProps({ list: [] });
        });

        it('returns a message that there are no entries found if passed an empty list', () => {
            expect(wrapper.find('#query-list-message').text()).toBe(`No ${entryType}s Found!`);
        });
    });

    describe('when a single item list is passed in', () => {
        beforeAll(() => {
            wrapper.setProps({
                list: singleEntry,
                selectEntry: mockSelectFunction
            });
        });

        it('returns a message that there is one issue found', () => {
            expect(wrapper.find('#query-list-message').text()).toBe(`1 ${entryType} Found!`);
        });
    });

    describe('when a list greater than one entry is passed in', () => {
        beforeAll(() => {
            wrapper.setProps({
                list: exampleList,
                selectEntry: mockSelectFunction
            });
        });

        it('returns a message that there are `n` number of entries found', () => {
            expect(wrapper.find('#query-list-message').text()).toBe(`${exampleList.length} ${entryType}s Found!`);
        });

        it('creates the correct number of list items', () => {
            expect(wrapper.find('IssueEntry').length).toEqual(exampleList.length);
        });

        it('passes the issue entry to the IssueEntry component', () => {
            expect(wrapper.find('IssueEntry').first().prop('entry')).toEqual(exampleList[0]);
        });

        it('passes the index entry to the IssueEntry component', () => {
            expect(wrapper.find('IssueEntry').at(0).prop('index')).toEqual(0);
            expect(wrapper.find('IssueEntry').at(1).prop('index')).toEqual(1);
        });

        it('passes the function for selecting an entry to the IssueEntry component', () => {
            expect(wrapper.find('IssueEntry').first().prop('select')).toEqual(mockSelectFunction);
        });
    });

});