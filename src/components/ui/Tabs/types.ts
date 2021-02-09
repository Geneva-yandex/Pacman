import {PropsWithChildren} from 'react';

export interface TabsProps extends PropsWithChildren<unknown> {
    selectedTab: string;
    onSelect: (tabId: string) => void;
}

export interface TabProps extends PropsWithChildren<unknown> {
    name: string;
    title: string;
    disabled?: boolean;
}
