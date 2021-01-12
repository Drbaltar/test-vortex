import React from 'react';
import { shallow } from 'enzyme';
import ViewIssues from './ViewIssues';

describe('ViewIssues', () => {
    const wrapper = shallow(<ViewIssues />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});