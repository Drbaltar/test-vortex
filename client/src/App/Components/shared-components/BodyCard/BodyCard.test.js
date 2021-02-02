import React from 'react';
import { shallow } from 'enzyme';
import BodyCard from './BodyCard';

class TestBodyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

const testTitle = 'Approve Test Question';

describe('BodyCard', () => {
    const wrapper = shallow(<BodyCard title={testTitle}>
        <TestBodyComponent />
        <TestBodyComponent />
    </BodyCard>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets the header to the passed in title prop', () => {
        expect(wrapper.find('.card-header').text()).toEqual(testTitle);
    });

    it('renders the children components in the body of the card', () => {
        expect(wrapper.find('TestBodyComponent').exists()).toBe(true);
    });

    it('renders all children components', () => {
        expect(wrapper.find('TestBodyComponent').length).toBe(2);

    });
});