import * as React from 'react';
import renderer from 'react-test-renderer';
import {Tabs, Tab} from './Tabs';

describe('Tabs', () => {
    test('Tabs component renders correctly', () => {
        const renderedComponent = renderer
            .create(
                <Tabs selectedTab={'firstTab'} onSelect={() => {}}>
                    <Tab name={'firstTab'} title='First tab'>
                        First tab content
                    </Tab>
                    <Tab name={'secondTab'} title='Second tab'>
                        Second tab content
                    </Tab>
                </Tabs>
            )
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });
});
