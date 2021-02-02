import React from 'react';
import { shallow } from 'enzyme';
import QueryButton from './QueryButton';

const mockQueryFunction = jest.fn();

describe('QueryButton', () => {
    const wrapper = shallow(<QueryButton hasQueryRan={false} query={mockQueryFunction}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets the text of the button to `Search` if hasQueryRan prop is false', () => {
        wrapper.setProps({ hasQueryRan: false });
        expect(wrapper.find('.btn').text()).toBe('Search');
    });

    it('sets the text of the button to `Refresh List` if hasQueryRan prop is true', () => {
        wrapper.setProps({ hasQueryRan: true });
        expect(wrapper.find('.btn').text()).toBe('\u21BB Refresh List');
    });

    describe('when the user clicks on the button', () => {
        beforeAll(() => {
            wrapper.find('.btn').simulate('click');
        });

        it('calls the query function', () => {
            expect(mockQueryFunction).toHaveBeenCalled();
        });
    });
});