import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
    const wrapper = shallow(<LoadingSpinner />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the spinner border component', () => {
        expect(wrapper.find('.spinner-border').exists()).toBe(true);
    });
});