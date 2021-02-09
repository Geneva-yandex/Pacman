import * as React from 'react';
import renderer from 'react-test-renderer';
import Tooltip from './Tooltip';

const props = {
    children: 'Tooltip link',
    id: 'test',
    tooltip: 'Tooltip content'
};
describe('Tooltip', () => {
    test('Tooltip component renders correctly', () => {
        const renderedComponent = renderer
            .create(<Tooltip {...props}/>)
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });
});
