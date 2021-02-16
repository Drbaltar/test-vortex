import React from 'react';
import { shallow } from 'enzyme';
import BodyCard from './BodyCard';

class TestBodyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

class TestFooterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

const testTitle = 'Approve Test Question';

describe('BodyCard', () => {
    const wrapper = shallow(<BodyCard title={testTitle}>
        <TestBodyComponent />
        <TestFooterComponent />
    </BodyCard>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets the header to the passed in title prop', () => {
        expect(wrapper.find('.card-header').text()).toEqual(testTitle);
    });

    it('renders the child body components in the body of the card', () => {
        expect(wrapper.find('TestBodyComponent').exists()).toBe(true);
    });

    it('renders the child footer component', () => {
        expect(wrapper.find('TestFooterComponent').exists()).toBe(true);

    });

    it('renders the child footer components in the footer of the card', () => {
        expect(wrapper.find('.card-footer').children().name()).toEqual('TestFooterComponent');
    });

    describe('when only one component is passed as a child', () => {
        let singleComponentBodyCard;

        beforeAll(() => {
            singleComponentBodyCard = shallow(<BodyCard title={testTitle}>
                <TestBodyComponent />
            </BodyCard>);
        });

        it('renders the component in the BodyCard body', () => {
            expect(singleComponentBodyCard.find('.p-4').children().name()).toEqual('TestBodyComponent');
        });

        it('does not render anything in the the child footer component', () => {
            expect(singleComponentBodyCard.find('.card-footer').exists()).toBe(false);
        });
    });
});