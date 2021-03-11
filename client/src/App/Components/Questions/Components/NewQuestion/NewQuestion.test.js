import React from 'react';
import Axios from 'axios';
import { shallow } from 'enzyme';
import NewQuestion from './NewQuestion';

describe('NewQuestion', () => {
    const wrapper = shallow(<NewQuestion questionType='Patriot'/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the SubmissionBody component', () => {
        expect(wrapper.find('SubmissionBody').exists()).toBe(true);
    });

    describe('when the questionType prop is Patriot', () => {
        beforeAll(() => {
            wrapper.setProps({ questionType: 'Patriot' });
        });

        it('renders the IBCSQuestionForm', () => {
            expect(wrapper.find('PatriotQuestionForm').exists()).toBe(true);
        });

        it('passes the correct title to the question form', () => {
            expect(wrapper.find('PatriotQuestionForm').prop('title')).toBe('Add New Question (Patriot)');
        });

        it('passes the correct submitMapping object to the SubmissionBody component', () => {
            const expectedSubmitMapping = {
                submitButton: {
                    requestFunction: Axios.post,
                    requestURI: '/api/questions/patriot/pending'
                }
            };

            expect(wrapper.find('SubmissionBody').prop('submitMapping')).toEqual(expectedSubmitMapping);
        });
    });

    describe('when the questionType prop is IBCS', () => {
        beforeAll(() => {
            wrapper.setProps({ questionType: 'IBCS' });
        });

        it('renders the IBCSQuestionForm', () => {
            expect(wrapper.find('IBCSQuestionForm').exists()).toBe(true);
        });

        it('passes the correct title to the question form', () => {
            expect(wrapper.find('IBCSQuestionForm').prop('title')).toBe('Add New Question (IBCS)');
        });

        it('passes the correct submitMapping object to the SubmissionBody component', () => {
            const expectedSubmitMapping = {
                submitButton: {
                    requestFunction: Axios.post,
                    requestURI: '/api/questions/ibcs/pending'
                }
            };

            expect(wrapper.find('SubmissionBody').prop('submitMapping')).toEqual(expectedSubmitMapping);
        });
    });

    it('renders the FormButtons component', () => {
        expect(wrapper.find('FormButtons').exists()).toBe(true);
    });

    it('passes the correct props to the FormButtons component', () => {
        expect(wrapper.find('FormButtons').prop('submit')).toEqual(true);
    });
});