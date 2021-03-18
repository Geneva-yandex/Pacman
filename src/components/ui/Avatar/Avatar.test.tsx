import * as React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './Avatar';

const props = {
    src: '/test.jpg',
    size: 30
};

describe('Avatar', () => {
    test('Avatar component renders correctly', () => {
        const renderedComponent = renderer
            .create(<Avatar {...props} />)
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });
});

