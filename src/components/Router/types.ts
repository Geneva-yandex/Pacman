import {ComponentType} from 'react';

export type RouteType = {
    id: string,
    exact?: boolean,
    path: string,
    component: ComponentType,
    title?: string,
    isNavVisible: boolean;
    isProtected?: boolean;
};

export interface IRouterProps {
    routes: RouteType[],
    layout: ComponentType
}
