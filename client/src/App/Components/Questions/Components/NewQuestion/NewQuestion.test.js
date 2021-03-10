import React from 'react';
import { shallow } from 'enzyme';
import NewQuestion from './NewQuestion';

describe('NewQuestion', () => {
    const wrapper = shallow(<NewQuestion />);

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
    });
});