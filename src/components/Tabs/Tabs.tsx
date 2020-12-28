import * as React from 'react';
import {ReactElement} from 'react';
import bem from 'easy-bem';
import classnames from 'classnames';
import {TabProps, TabsProps} from './types';

const b = bem('Tabs');

export const Tab = (props: TabProps): ReactElement => {
    return props.children as ReactElement<any>;
};

const renderTabHeaderItem = ({name, title, disabled}: TabProps, selected: string, onClick: () => void): ReactElement => {
    const c = b('header-item');
    const className = classnames(c, {
        [`${c}--active`]: name === selected
    });

    return <li key={name} className={className}>
        <button className={b('tab-button')} onClick={onClick} disabled={disabled}>{title}</button>
    </li>;
};

export const Tabs = ({children, selectedTab, onSelect}: TabsProps): ReactElement => {
    const content = React.Children.map(children, (tab: ReactElement<TabProps>) => {
        return selectedTab === tab.props.name ? tab : null;
    });

    return <div className={b()}>
        <ul className={b('nav')}>
            {React.Children.map(children, (tab: ReactElement<TabProps>, index: number) => {
                return <li key={index} className={classnames({active: selectedTab === tab.props.name})}>
                    {renderTabHeaderItem(tab.props, selectedTab, () => onSelect(tab.props.name))}
                </li>;
            })}
        </ul>

        <div className={b('content')}>
            {content}
        </div>
    </div>;
};
