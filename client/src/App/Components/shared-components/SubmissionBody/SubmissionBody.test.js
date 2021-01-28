import React from 'react';
import { shallow } from 'enzyme';
import SubmissionBody from './SubmissionBody';

const mockSubmissionFunction = jest.fn();
const mockPreventDefault = jest.fn();
const mockEvent = { preventDefault: mockPreventDefault };

const testSubmissionPayload = {
    payload: 'Test Payload'
};

class FormView extends React.Component {
    constructor(props) {
        super(props);
    }

    callSubmitFunction = async () => {
        await this.props.submit(mockEvent, testSubmissionPayload);
    }

    render() { <div />; }
}

const initialState = {
    submissionResponse: '',
    successFlag: false
};

describe('SubmissionBody', () => {
    const wrapper = shallow(<SubmissionBody submit={mockSubmissionFunction}>
        <FormView />
    </SubmissionBody>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets the initial values of state correctly', () => {
        expect(wrapper.state()).toEqual(initialState);
    });

    it('renders the form view', () => {
        expect(wrapper.find('FormView').exists()).toBe(true);
    });

    it('passes the submission function to the FormView', () => {
        expect(wrapper.find('FormView').prop('submit')).toBeInstanceOf(Function);
    });

    it('does not render the SuccessMessage', () => {
        expect(wrapper.find('SuccessMessage').exists()).toBe(false);
    });

    describe('when the submission response has a non-empty string and success flag has been set to true', () => {
        const testResponse = 'Submission is good!';

        beforeAll(() => {
            wrapper.setState({ submissionResponse: testResponse, successFlag: true });
        });

        it('renders the SuccessMessage component', () => {
            expect(wrapper.find('SuccessMessage').exists()).toBe(true);
        });

        it('does not render the form view', () => {
            expect(wrapper.find('FormView').exists()).toBe(false);
        });

        it('passes the submission response to the SuccessMessage component', () => {
            expect(wrapper.find('SuccessMessage').prop('message')).toBe(testResponse);
        });

        it('passes a click handler function to the SuccessMessage component', () => {
            expect(wrapper.find('SuccessMessage').prop('clickHandler')).toBeInstanceOf(Function);
        });

        describe('when the SuccessMessage component calls the clickHandler function', () => {
            beforeAll(() => {
                const clickHandler = wrapper.find('SuccessMessage').prop('clickHandler');
                clickHandler(mockEvent);
            });

            it('prevents default button behavior', () => {
                expect(mockPreventDefault).toHaveBeenCalledTimes(1);
                mockPreventDefault.mockClear();
            });

            it('sets the state to the initial state', () => {
                expect(wrapper.state()).toEqual(initialState);
            });
        });

        afterAll(() => {
            wrapper.setState(initialState);
        });
    });

    describe('when the submission response has a non-empty string and success flag has been set to false', () => {
        const testResponse = 'Submission is not good!';

        beforeAll(() => {
            wrapper.setState({ submissionResponse: testResponse, successFlag: false });
        });

        it('renders the form view', () => {
            expect(wrapper.find('FormView').exists()).toBe(true);
        });

        it('does not render the SuccessMessage component', () => {
            expect(wrapper.find('SuccessMessage').exists()).toBe(false);
        });

        it('passes the submission response to the form view', () => {
            expect(wrapper.find('FormView').prop('submissionResponse')).toEqual(testResponse);
        });

        afterAll(() => {
            wrapper.setState(initialState);
        });
    });

    describe('when the form view calls the submit function', () => {
        beforeAll(() => {
            mockSubmissionFunction.mockResolvedValueOnce('');
            wrapper.find('FormView').shallow().instance().callSubmitFunction();
        });

        it('prevents default button behavior', () => {
            expect(mockPreventDefault).toHaveBeenCalledTimes(1);
            mockPreventDefault.mockClear();
        });

        it('calls the submission function passed to component', () => {
            expect(mockSubmissionFunction).toHaveBeenCalledWith(testSubmissionPayload);
            mockSubmissionFunction.mockClear();
        });

        describe('when the submission response is returned successfully', () => {
            const testSuccessMessage = 'Submission was successful!';

            beforeAll(() => {
                mockSubmissionFunction.mockResolvedValueOnce(testSuccessMessage);
                wrapper.find('FormView').shallow().instance().callSubmitFunction();
            });

            it('sets the submission response and success flag to true in state', () => {
                expect(wrapper.state()).toEqual({ submissionResponse: testSuccessMessage, successFlag: true });
            });

            afterAll(() => {
                wrapper.setState(initialState);
            });
        });

        describe('when the submission response is NOT returned successfully', () => {
            const testErrorMessage = 'Submission was NOT successful!';

            beforeAll(() => {
                mockSubmissionFunction.mockRejectedValueOnce(testErrorMessage);
                wrapper.find('FormView').shallow().instance().callSubmitFunction();
            });

            it('sets the submission response but leaves the success flag as false in state', () => {
                expect(wrapper.state()).toEqual({ submissionResponse: testErrorMessage, successFlag: false });
            });

            afterAll(() => {
                wrapper.setState(initialState);
            });
        });
    });
});