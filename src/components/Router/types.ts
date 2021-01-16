import * as React from 'react';

export type RouteType = {
    id: string,
    exact: boolean,
    path: string,
    component: React.ComponentType,
    title: string,
    isNavVisible: boolean,
    isProtected: boolean,
};

export interface IRouterProps {
    routes: RouteType[],
    layout: React.ComponentType
}
