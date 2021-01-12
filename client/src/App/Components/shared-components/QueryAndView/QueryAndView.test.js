import React from 'react';
import { shallow } from 'enzyme';
import QueryAndView from './QueryAndView';

const initialState = {
    queryResults: [],
    hasQueryRan: false,
    loading: false,
    selectedEntry: null,
    detailedView: false,
    submissionResponse: '',
    successAlert: false
};

const MockQueryHeader = jest.fn();
const mockQueryFunction = jest.fn();

describe('QueryAndView', () => {
    const wrapper = shallow(<QueryAndView queryHeader={MockQueryHeader} query={mockQueryFunction}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    }); 

    it('sets the initial values of state correctly', () => {
        expect(wrapper.state()).toEqual(initialState);
    });

    it('sets the correct initial query header hasQueryRan prop and query function', () => {
        expect(MockQueryHeader).toHaveBeenCalledWith({ hasQueryRan: false, query: expect.any(Function) });
    });
});