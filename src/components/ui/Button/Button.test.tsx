import * as React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
    test('Button component renders correctly', () => {
        const renderedComponent = renderer
            .create(<Button />)
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });
});
