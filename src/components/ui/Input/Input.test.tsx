import * as React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';

const props = {
    type: 'text',
    name: 'name'
};

describe('Input', () => {
    test('Input component renders correctly', () => {
        const renderedComponent = renderer
            .create(<Input {...props}/>)
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });
});
