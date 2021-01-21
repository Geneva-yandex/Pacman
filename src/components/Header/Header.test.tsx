import * as React from 'react';
import {shallow} from 'enzyme';
import Header from './Header';

describe('Header', () => {
    test('Header component renders correctly', () => {
        const renderedComponent = shallow(<Header />);
        expect(renderedComponent).toMatchSnapshot();
    });
});

