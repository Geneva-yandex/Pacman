import {ComponentType} from 'react';
import {ConnectedComponent} from "react-redux";

export type RouteType = {
    id: string,
    exact?: boolean,
    path: string,
    component: ComponentType | ConnectedComponent<any, any>,
    title?: string,
    isNavVisible: boolean;
    isProtected?: boolean;
};

export interface IRouterProps {
    routes: RouteType[],
    layout: any,
}
