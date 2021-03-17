import * as React from 'react';
import renderer from 'react-test-renderer';
import Modal from './Modal';

const props = {
    isClosed: false,
    close: () => {},
    stateModal: 'test'
};
describe('Modal', () => {
    test('Modal component renders correctly', () => {
        const renderedComponent = renderer
            .create(<Modal {...props}/>)
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });
});
