import React from 'react';
import { shallow } from 'enzyme';
import ListEntry from './ListEntry';

const exampleEntry = [
    {
        label: 'Test Label 1:',
        field: 'Test Field 1:'
    },
    {
        label: 'Test Label 2:',
        field: 'Test Field 2:'
    },
    {
        label: 'Test Label 3:',
        field: 'Test Field 3:'
    },
    {
        label: 'Test Label 4:',
        field: 'Test Field 4:'
    }
];

describe('ListEntry', () => {
    const wrapper = shallow(<ListEntry entryFields={exampleEntry}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('creates the correct number of fields based on input label/fields', () => {
        expect(wrapper.find('.col-sm').length).toBe(exampleEntry.length);
    });

    it('populates all the fields with the correct information', () => {
        let fieldNodes = wrapper.find('.col-sm');

        expect(getFieldValues(fieldNodes)).toEqual(exampleEntry);
    });
});

const getFieldValues = (nodes) => {
    let fieldValues = [];

    for (let index = 0; index < exampleEntry.length; index++) {
        fieldValues.push(
            {
                label: nodes.at(index).find('label').text(),
                field: nodes.at(index).find('input').props().placeholder
            }
        );
    }

    return fieldValues;
};