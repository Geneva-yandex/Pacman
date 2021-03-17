import {ComponentType} from 'react';
<<<<<<< HEAD:src/components/Router/types.ts
import {ConnectedComponent} from 'react-redux';
=======
>>>>>>> origin/dev:src/components/Bundle/types.ts

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
