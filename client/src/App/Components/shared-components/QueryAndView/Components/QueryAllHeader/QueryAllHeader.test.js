import React from 'react';
import { shallow } from 'enzyme';
import QueryAllHeader from './QueryAllHeader';

const mockQueryFunction = jest.fn();

describe('QueryAllHeader', () => {
    const wrapper = shallow(<QueryAllHeader hasQueryRan={true} query={mockQueryFunction}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('passes boolean value indicating if query has previously been run', () => {
        expect(wrapper.find('QueryButton').prop('hasQueryRan')).toBe(true);
    });

    it('passes the query function to the QueryButton', () => {
        expect(wrapper.find('QueryButton').prop('query')).toEqual(mockQueryFunction);
    });
});