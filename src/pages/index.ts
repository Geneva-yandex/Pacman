import IndexPage from './IndexPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignPage';
import StartPage from './StartPage';

const ROUTE_ROOT = 'root';
const ROUTE_LOGIN = 'login';
const ROUTE_SIGNUP = 'sign up';
const ROUTE_START = 'start page';

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
        exact: false,
        path: '/login',
        component: LoginPage,
        title: 'Log-in',
        isNavVisible: true
    },
    {
        id: ROUTE_SIGNUP,
        exact: false,
        path: '/sign-up',
        component: SignUpPage,
        title: 'Sign Up',
        isNavVisible: true
    },
    {
        id: ROUTE_START,
        exact: true,
        path: '/start',
        component: StartPage,
        title: 'Start',
        isNavVisible: false
    }

];
