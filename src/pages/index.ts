import IndexPage from './IndexPage';
import LoginPage from './LoginPage';
import GamePage from './GamePage';
import ForumPage from './ForumPage';
import TopicPage from './TopicPage';
import SignUpPage from './SignPage';
import StartPage from './StartPage';

const ROUTE_ROOT = 'root';
const ROUTE_LOGIN = 'login';
const ROUTE_FORUM = 'forum';
const ROUTE_TOPIC = 'topic';
const ROUTE_GAME = 'game';
const ROUTE_SIGNUP = 'sign up';
const ROUTE_START = 'start page';

export default [
    {
        id: ROUTE_ROOT,
        exact: true,
        path: '/',
        component: IndexPage,
        title: 'PACMAN',
        isNavVisible: true,
        isProtected: true
    },
    {
        id: ROUTE_LOGIN,
        exact: true,
        path: '/login',
        component: LoginPage,
        title: 'Log-in',
        isNavVisible: true
    },
    {
        id: ROUTE_GAME,
        exact: true,
        path: '/game',
        component: GamePage,
        title: 'game',
        isNavVisible: false,
        isProtected: true
    },
    {
        id: ROUTE_FORUM,
        exact: true,
        path: '/forum',
        component: ForumPage,
        title: 'Forum',
        isNavVisible: true,
        isProtected: true
    },
    {
        id: ROUTE_TOPIC,
        path: '/forum/:topicId',
        component: TopicPage,
        isNavVisible: false,
        isProtected: true
    },
    {
        id: ROUTE_SIGNUP,
        exact: false,
        path: '/sign-up',
        component: SignUpPage,
        title: 'Sign Up',
        isNavVisible: true,
        isProtected: false
    },
    {
        id: ROUTE_START,
        exact: true,
        path: '/start',
        component: StartPage,
        title: 'Start',
        isNavVisible: true,
        isProtected: true
    }
];
