import React from 'react';
import { shallow } from 'enzyme';
import SubmissionBody from './SubmissionBody';

const initialState = {
    queryResults: [],
    hasQueryRan: false,
    loading: false,
    submissionResponse: '',
    successAlert: false
};
const MockQueryView = jest.fn();

describe('SubmissionBody', () => {
    const wrapper = shallow(<SubmissionBody queryView={MockQueryView}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets the initial values of state correctly', () => {
        expect(wrapper.state()).toEqual(initialState);
    });

    it('renders the query view', () => {
        expect(MockQueryView).toHaveBeenCalled();
    });

    it('does not render the SuccessMessage', () => {
        expect(wrapper.find('SuccessMessage').exists()).toBe(false);
    });

    describe('when the submission response has a non-empty string and success alert has been set to true', () => {
        const testResponse = 'Submission is good!';

        beforeAll(() => {
            wrapper.setState({ submissionResponse: testResponse, successAlert: true });
        });

        it('renders the SuccessMessage component', () => {
            expect(wrapper.find('SuccessMessage').exists()).toBe(true);
        });

        it('passes the submission response to the SuccessMessage component', () => {
            expect(wrapper.find('SuccessMessage').prop('message')).toBe(testResponse);
        });

        it('passes a click handler function to the SuccessMessage component', () => {
            expect(wrapper.find('SuccessMessage').prop('clickHandler')).toBeInstanceOf(Function);
        });

        describe('when the SuccessMessage component calls the clickHandler function', () => {
            const mockPreventDefault = jest.fn();

            beforeAll(() => {
                const clickHandler = wrapper.find('SuccessMessage').prop('clickHandler');
                clickHandler({ target: { id: 'returnButton' }, preventDefault: mockPreventDefault});
            });

            it('prevents default button behavior', () => {
                expect(mockPreventDefault).toHaveBeenCalled();
            });

            // it('changes the state back to the initial state', () => {
            //     expect(wrapper.setProps({}).state()).toEqual(initialState);
            // });
        });
    });
});