import React from 'react';
import { shallow } from 'enzyme';
import SubmissionBody from './SubmissionBody';
import Axios from 'axios';

jest.mock('axios');

const mockPreventDefault = jest.fn();
const mockEvent = { preventDefault: mockPreventDefault };

const testSubmissionPayload = {
    _id: 12345678,
    payload: 'Test Payload'
};

class FormView extends React.Component {
    constructor(props) {
        super(props);
    }

    callSubmitFunction = async () => {
        await this.props.submit('submitButton', testSubmissionPayload);
    }

    callSubmitFunctionWithDelete = async () => {
        await this.props.submit('deleteButton', testSubmissionPayload);
    }

    clearErrorMessage = () => {
        this.props.clearErrorMessage();
    }

    render() { <div />; }
}

const submitMapping = {
    submitButton: {
        requestFunction: Axios.post,
        requestURI: '/issues/new'
    },
    deleteButton: {
        requestFunction: Axios.delete,
        requestURI: '/api/issues/delete/byID/',
        param: true
    }
};

const initialState = {
    submissionResponse: '',
    successFlag: false
};

describe('SubmissionBody', () => {
    const wrapper = shallow(<SubmissionBody submitMapping={submitMapping}>
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

    it('passes the clear response function to the FormView', () => {
        expect(wrapper.find('FormView').prop('clearErrorMessage')).toBeInstanceOf(Function);
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
            expect(wrapper.find('FormView').prop('errorMessage')).toEqual(testResponse);
        });

        afterAll(() => {
            wrapper.setState(initialState);
        });
    });

    describe('when the form view calls the submit function', () => {
        beforeAll(() => {
            Axios.post.mockResolvedValueOnce({ data: ''});
            wrapper.find('FormView').shallow().instance().callSubmitFunction();
        });

        it('calls the submission function passed to component', () => {
            expect(Axios.post).toHaveBeenCalledWith(submitMapping.submitButton.requestURI, testSubmissionPayload);
            Axios.post.mockClear();
        });

        describe('when the submission response is returned successfully', () => {
            const testSuccessMessage = 'Submission was successful!';

            beforeAll(() => {
                Axios.post.mockResolvedValueOnce({ data: testSuccessMessage });
                wrapper.find('FormView').shallow().instance().callSubmitFunction();
            });

            it('sets the submission response and success flag to true in state', () => {
                expect(wrapper.state()).toEqual({ submissionResponse: testSuccessMessage, successFlag: true });
            });

            afterAll(() => {
                wrapper.setState(initialState);
            });
        });

        describe('when the submission response is NOT returned successfully (no message in data)', () => {
            const testErrorMessage = 'Submission was NOT successful!';

            beforeAll(() => {
                Axios.post.mockRejectedValueOnce({ response: { data: testErrorMessage }});
                wrapper.find('FormView').shallow().instance().callSubmitFunction();
            });

            it('sets the submission response but leaves the success flag as false in state', () => {
                expect(wrapper.state()).toEqual({ submissionResponse: testErrorMessage, successFlag: false });
            });

            afterAll(() => {
                wrapper.setState(initialState);
            });
        });

        describe('when the submission response is NOT returned successfully (message in data)', () => {
            const testErrorMessage = 'Submission was NOT successful!';

            beforeAll(() => {
                Axios.post.mockRejectedValueOnce({ response: { data: { message: testErrorMessage }}});
                wrapper.find('FormView').shallow().instance().callSubmitFunction();
            });

            it('sets the submission response but leaves the success flag as false in state', () => {
                expect(wrapper.state()).toEqual({ submissionResponse: testErrorMessage, successFlag: false });
            });

            afterAll(() => {
                wrapper.setState(initialState);
            });
        });

        describe('when the submission request has an error', () => {
            const requestErrorMessage = 'There was an issue processing your request to the server. Please try to resubmit.';

            beforeAll(() => {
                Axios.post.mockRejectedValueOnce({ request: 'Request Error'});
                wrapper.find('FormView').shallow().instance().callSubmitFunction();
            });

            it('sets the submission response to the request error but leaves the success flag as false in state', () => {
                expect(wrapper.state()).toEqual({ submissionResponse: requestErrorMessage, successFlag: false });
            });

            afterAll(() => {
                wrapper.setState(initialState);
            });
        });

        describe('when the submission request has an error not handled above', () => {
            const testErrorMessage = 'There was an issue when creating your request to the server. Please try to resubmit.';

            beforeAll(() => {
                Axios.post.mockRejectedValueOnce({});
                wrapper.find('FormView').shallow().instance().callSubmitFunction();
            });

            it('sets the submission response to the misc error but leaves the success flag as false in state', () => {
                expect(wrapper.state()).toEqual({ submissionResponse: testErrorMessage, successFlag: false });
            });

            afterAll(() => {
                wrapper.setState(initialState);
            });
        });

        afterAll(() => {
            wrapper.setState(initialState);
        });
    });

    describe('when the form view calls the clear error message function', () => {
        beforeAll(() => {
            wrapper.setState({ submissionResponse: 'Submission was not good!', successFlag: false });
            wrapper.find('FormView').shallow().instance().clearErrorMessage();
        });

        it('sets the state to the initial state', () => {
            expect(wrapper.state()).toEqual(initialState);
        });

        afterAll(() => {
            wrapper.setState(initialState);
        });
    });

    describe('when the submit is called with a mapping where param is set to true', () => {
        beforeAll(() => {
            Axios.delete.mockResolvedValueOnce('The entry was deleted.')
            wrapper.find('FormView').shallow().instance().callSubmitFunctionWithDelete();
        });
        
        it('calls the correct Axios function with the _id attribute', () => {
            expect(Axios.delete).toHaveBeenCalledWith('/api/issues/delete/byID/12345678', null)
            Axios.delete.mockClear();
        });
    });
});