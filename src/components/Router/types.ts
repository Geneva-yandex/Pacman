import {ComponentType} from 'react';
/* Import {ConnectedComponent} from "react-redux"; */

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
    layout: any,
}
