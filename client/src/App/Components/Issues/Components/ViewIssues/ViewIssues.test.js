import React from 'react';
import { shallow } from 'enzyme';
import ViewIssues from './ViewIssues';
import Axios from 'axios';

jest.mock('axios');

const submitMapping = {
    deleteButton: {
        requestFunction: Axios.delete,
        requestURI: '/api/issues/delete/byID/',
        param: true
    }
};

describe('ViewIssues', () => {
    const wrapper = shallow(<ViewIssues />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the SubmissionBody component', () => {
        expect(wrapper.find('SubmissionBody').exists()).toBe(true);
    });

    it('passes the submit mapping prop to the SubmissionBody component', () => {
        expect(wrapper.find('SubmissionBody').prop('submitMapping')).toEqual(submitMapping);
    });

    it('passes the QueryAndView component to SubmissionBody component', () => {
        expect(wrapper.find('SubmissionBody').children().name()).toEqual('QueryAndView');
    });

    it('renders the QueryAndView component', () => {
        expect(wrapper.find('QueryAndView').exists()).toBe(true);
    });

    it('sets the title of the QueryAndView to the correct text', () => {
        expect(wrapper.find('QueryAndView').prop('title')).toEqual('View Existing Issues');
    });

    it('passes the QueryAllHeader component to QueryAndView component', () => {
        expect(wrapper.find('QueryAndView').childAt(0).name()).toEqual('QueryAllHeader');
    });

    it('passes the QueryList component to QueryAndView component', () => {
        expect(wrapper.find('QueryAndView').childAt(1).name()).toEqual('QueryList');
    });

    it('passes the IssueForm component to the QueryAndView component', () => {
        expect(wrapper.find('QueryAndView').childAt(2).name()).toEqual('IssueForm');
    });

    it('passes the query function to the QueryAndView component', () => {
        expect(wrapper.find('QueryAndView').prop('query')).toBeInstanceOf(Function);
    });

    it('passes the correct query path to the QueryAndView component', () => {
        expect(wrapper.find('QueryAndView').prop('queryPath')).toEqual('/api/issues/all');
    });

    it('passes the entry type to the QueryList component', () => {
        expect(wrapper.find('QueryList').prop('entryType')).toEqual('Issue');
    });

    it('passes the IssueEntry component to the QueryList component', () => {
        expect(wrapper.find('QueryList').children().name()).toEqual('IssueEntry');
    });

    it('passes the FormButtons to the IssueForm component', () => {
        expect(wrapper.find('IssueForm').children().name()).toEqual('FormButtons');
    });

    it('passes the cancel button text to the FormButton component', () => {
        expect(wrapper.find('FormButtons').prop('cancelButtonText')).toEqual('Revert Changes');
    });

    it('passes the cancel button id to the FormButton component', () => {
        expect(wrapper.find('FormButtons').prop('cancelButtonID')).toEqual('clearAllButton');
    });

    it('passes the delete button text to the FormButton component', () => {
        expect(wrapper.find('FormButtons').prop('deleteButtonText')).toEqual('Close Issue');
    });

    it('passes the delete button id to the FormButton component', () => {
        expect(wrapper.find('FormButtons').prop('deleteButtonID')).toEqual('deleteButton');
    });

    describe('when the query function is called by QueryAndView', () => {
        beforeAll(() => {
            Axios.mockImplementation(() => {
                return {
                    get: () => {
                        return Promise.resolve();
                    }
                };
            });

            const query = wrapper.find('QueryAndView').prop('query');
            query();
        });

        it('calls the axios get function ', () => {
            expect(Axios.get).toHaveBeenCalled();
        });
    });
});