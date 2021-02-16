import React from 'react';
import { shallow } from 'enzyme';
import QueryAndView from './QueryAndView';

class QueryHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

class QueryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

class DetailView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { <div />; }
}

const initialState = {
    queryResults: [],
    queryErrorMessage: '',
    hasQueryRan: false,
    isLoading: false,
    selectedEntry: null,
    detailViewFlag: false
};

const testQueryResponse = [
    { entry: 'Test Entry' },
    { entry: 'Another Entry' },
    { entry: 'A Third Entry' }
];

const mockQueryFunction = jest.fn();
const mockSumbitFunction = jest.fn();
const mockClearError = jest.fn();
const mockPreventDefault = jest.fn();
const mockEvent = { preventDefault: mockPreventDefault };

const testQueryPath = '/search';
const testTitle = 'View Entries';

describe('QueryAndView', () => {
    const wrapper = shallow(<QueryAndView 
        title={testTitle} query={mockQueryFunction} 
        queryPath={testQueryPath} submit={mockSumbitFunction}
        clearErrorMessage={mockClearError}>
        <QueryHeader />
        <QueryList />
        <DetailView />
    </QueryAndView>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    }); 

    it('sets the initial values of state correctly', () => {
        expect(wrapper.state()).toEqual(initialState);
    });

    it('renders the BodyCard component for the query view', () => {
        expect(wrapper.find('BodyCard').exists()).toBe(true);
    });

    it('passes the title to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').prop('title')).toEqual(testTitle);
    });

    it('passes the form body to the BodyCard component', () => {
        expect(wrapper.find('BodyCard').childAt(0).prop('id')).toEqual('query-view-body');
    });

    it('sets the correct initial query header hasQueryRan prop and query function', () => {
        expect(wrapper.find('QueryHeader').props()).toEqual({ hasQueryRan: false, query: expect.any(Function) });
    });

    it('does not render the spinning icon', () => {
        expect(wrapper.find('LoadingSpinner').exists()).toBe(false);
    });

    it('does not render the error message component when query error string is empty', () => {
        expect(wrapper.find('ErrorMessage').exists()).toBe(false);
    });

    it('does not render the query list component before query has ran', () => {
        expect(wrapper.find('QueryList').exists()).toBe(false);
    });

    it('does not render the detail component before entry has been selected', () => {
        expect(wrapper.find('DetailView').exists()).toBe(false);
    });

    describe('when the query is running but has not returned', () => {
        beforeAll(() => {
            wrapper.setState({ isLoading: true });
        });

        it('renders the spinning icon', () => {
            expect(wrapper.find('LoadingSpinner').exists()).toBe(true);
        });

        afterAll(() => {
            wrapper.setState({ isLoading: false });
        });
    });

    describe('when a query is initiated', () => {
        const loadingSpy = jest.spyOn(wrapper.instance(), 'setLoadingToTrue');

        beforeAll(() => {
            mockQueryFunction.mockResolvedValueOnce({ data: testQueryResponse});

            const query = wrapper.find('QueryHeader').prop('query');
            query(mockEvent);
        });

        it('prevents default button behavior', () => {
            expect(mockPreventDefault).toHaveBeenCalledTimes(1);
            mockPreventDefault.mockClear();
        });

        it('sets the loading flag to true', () => {
            expect(loadingSpy).toHaveBeenCalledTimes(1);
            loadingSpy.mockRestore();
        });

        it('calls the passed in query function', () => {
            expect(mockQueryFunction).toHaveBeenCalledWith(testQueryPath);
            mockQueryFunction.mockClear();
        });

        describe('when a successful query result is returned', () => {
            it('sets the loading flag in state back to false', () => {
                expect(wrapper.state().isLoading).toBe(false);
            });

            it('populates the query results value in state', () => {
                expect(wrapper.state().queryResults).toEqual(testQueryResponse);
            });

            it('sets the hasQueryRan flag to true in state', async () => {
                expect(wrapper.state().hasQueryRan).toBe(true);
            });

            it('renders the query list component', () => {
                expect(wrapper.find('QueryList').exists()).toBe(true);
            });

            it('passes the query results to the query list component', () => {
                expect(wrapper.find('QueryList').prop('list')).toEqual(testQueryResponse);
            });

            it('passes a function for handling detail view click', () => {
                expect(wrapper.find('QueryList').prop('selectEntry')).toBeInstanceOf(Function);
            });

            describe('when an entry in the query list is selected', () => {
                const testIndex = 1;

                beforeAll(() => {
                    const selectEntry = wrapper.find('QueryList').prop('selectEntry');
                    selectEntry(testIndex);
                });

                it('sets the detail view flag to true', () => {
                    expect(wrapper.state().detailViewFlag).toBe(true);
                });

                it('sets the selected entry in state to the index passed from query list', () => {
                    expect(wrapper.state().selectedEntry).toEqual(testQueryResponse[testIndex]);
                });

                it('renders the return button', () => {
                    expect(wrapper.find('#returnButton').exists()).toBe(true);
                });

                it('sets the text of the return button to the correct value', () => {
                    expect(wrapper.find('#returnButton').text()).toEqual('\u21e6 Return to Menu');
                });

                it('set the onClick prop of return button to the returnToMenu handler', () => {
                    expect(wrapper.find('#returnButton').prop('onClick')).toBeInstanceOf(Function);
                });

                it('renders the detail view component', () => {
                    expect(wrapper.find('DetailView').exists()).toBe(true);
                });

                it('passes the title to the the detail view component', () => {
                    expect(wrapper.find('DetailView').prop('title')).toEqual(testTitle);
                });

                it('passes the selected entry to the detail view component', () => {
                    expect(wrapper.find('DetailView').prop('data')).toEqual(testQueryResponse[testIndex]);
                });

                it('passes the submit function to the detail view component', () => {
                    expect(wrapper.find('DetailView').prop('submit')).toBe(mockSumbitFunction);
                });

                it('passes the clear error message prop to the DetailView component', () => {
                    expect(wrapper.find('DetailView').prop('clearErrorMessage')).toBe(mockClearError);
                });

                describe('when the detail view calls the submit function', () => {
                    beforeAll(() => {
                        const submit = wrapper.find('DetailView').prop('submit');
                        submit(mockEvent, testQueryResponse[testIndex]);
                    });

                    it('calls the submit function with the event and entry', () => {
                        expect(mockSumbitFunction).toHaveBeenCalledWith(mockEvent, testQueryResponse[testIndex]);
                    });

                    describe('when the response is not blank but component is still rendered', () => {
                        const testErrorMessage = 'The request is invalid!';
                        
                        beforeAll(() => {
                            wrapper.setProps({ submissionResponse: testErrorMessage });
                        });

                        it('passes the submission response to the detail view component', () => {
                            expect(wrapper.find('DetailView').prop('submissionResponse')).toEqual(testErrorMessage);
                        });

                        afterAll(() => {
                            wrapper.setProps({ submissionResponse: '' });
                        });
                    });
                });

                describe('when the detail view registers a click on the return button', () => {
                    beforeAll(() => {
                        wrapper.setState({
                            queryResults: testQueryResponse,
                            queryErrorMessage: '',
                            hasQueryRan: true,
                            isLoading: false,
                            selectedEntry: testIndex,
                            detailViewFlag: true
                        });
                        
                        wrapper.find('#returnButton').simulate('click', mockEvent);
                    });

                    it('prevents default button behavior', () => {
                        expect(mockPreventDefault).toHaveBeenCalledTimes(1);
                        mockPreventDefault.mockClear();
                    });

                    it('sets the selected entry to null', () => {
                        expect(wrapper.state().selectedEntry).toBe(null);
                    });

                    it('sets the detail view flag to false', () => {
                        expect(wrapper.state().detailViewFlag).toBe(false);
                    });
                });
            });
        });

        describe('when a query is not completed successfully', () => {
            const queryErrorMessage = 'Query cannot be completed successfully';

            beforeAll(() => {
                wrapper.setState(initialState);

                mockQueryFunction.mockRejectedValueOnce(queryErrorMessage);
    
                const query = wrapper.find('QueryHeader').prop('query');
                query(mockEvent);
            });

            it('sets the loading flag in state back to false', () => {
                expect(wrapper.state().isLoading).toBe(false);
            });

            it('sets the query error message in state to the returned error message', () => {
                expect(wrapper.state().queryErrorMessage).toEqual(queryErrorMessage);
            });

            it('renders the error message component', () => {
                expect(wrapper.find('ErrorMessage').exists()).toBe(true);
            });

            it('passes the query error message to the error message component', () => {
                expect(wrapper.find('ErrorMessage').prop('message')).toEqual(queryErrorMessage);
            });
        });
    });
});