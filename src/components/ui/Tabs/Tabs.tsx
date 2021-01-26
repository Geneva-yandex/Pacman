import React from 'react';
import {ReactElement} from 'react';
import bem from 'easy-bem';
import {TabProps, TabsProps} from './types';
import './Tabs.scss';

const b = bem('Tabs');

export const Tab = (props: TabProps): ReactElement => {
    return props.children as ReactElement<any>;
};

const renderTabHeaderItem = ({name, title, disabled}: TabProps, selected: string, onClick: () => void): ReactElement => {
    const className = b('header-item', {active: name === selected});

    return <li key={name} className={className}>
        <button className={b('tab-button')} onClick={onClick} disabled={disabled}>{title}</button>
    </li>;
};

export const Tabs = ({children, selectedTab, onSelect}: TabsProps): ReactElement => {
    const headers: ReactElement[] = [];

    const content = React.Children.map(children, (tab: ReactElement<TabProps>) => {
        const tabHeader = renderTabHeaderItem(tab.props, selectedTab, () => onSelect(tab.props.name));
        headers.push(tabHeader);

        return selectedTab === tab.props.name ? tab : null;
    });

    return <div className={b()}>
        <ul className={b('nav')}>
            {headers.map(header => header)}
        </ul>

        <div className={b('content')}>
            {content}
        </div>
    </div>;
};

