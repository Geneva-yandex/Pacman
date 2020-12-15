import IndexPage from './IndexPage';
import LoginPage from './LoginPage';

const ROUTE_ROOT = 'root';
const ROUTE_LOGIN = 'login';

export default [
    {
        id: ROUTE_ROOT,
        exact: true,
        path: '/',
        component: IndexPage,
        title: 'PACMAN',
        isNavVisible: true
    },
    {
        id: ROUTE_LOGIN,
        exact: true,
        path: '/login',
        component: LoginPage,
        title: 'Log-in',
        isNavVisible: true
    }
];
