import * as React from 'react';
import {shallow} from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
    test('ErrorBoundary component renders correctly', () => {
        const renderedComponent = shallow(<ErrorBoundary />);
        expect(renderedComponent).toMatchSnapshot();
    });
});

