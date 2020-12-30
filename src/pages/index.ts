import LoginPage from './LoginPage';
import SignUpPage from './SignPage';
import StartPage from './StartPage';
import ProfilePage from './ProfilePage';

const ROUTE_ROOT = 'root';
const ROUTE_LOGIN = 'login';
const ROUTE_SIGNUP = 'sign up';
const PROFILE = 'profile page';

export default [
    {
        id: ROUTE_ROOT,
        exact: true,
        path: '/',
        component: StartPage,
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
        id: PROFILE,
        exact: false,
        path: '/profile',
        component: ProfilePage,
        title: 'Profile',
        isNavVisible: true
    }
];
