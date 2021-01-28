import LoginPage from './LoginPage';
import GamePage from './GamePage';
import ForumPage from './ForumPage';
import TopicPage from './TopicPage';
import ProfilePage from './ProfilePage';
import StartPage from './StartPage';
import SignUpPage from './SignPage';

const ROUTE_ROOT = 'root';
const ROUTE_LOGIN = 'login';
const ROUTE_SIGNUP = 'signup';
const ROUTE_FORUM = 'forum';
const ROUTE_TOPIC = 'topic';
const ROUTE_GAME = 'game';
const ROUTE_PROFILE = 'profile';

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
        exact: true,
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
        id: ROUTE_GAME,
        exact: true,
        path: '/game',
        component: GamePage,
        title: 'game',
        isNavVisible: false
    },
    {
        id: ROUTE_FORUM,
        exact: true,
        path: '/forum',
        component: ForumPage,
        title: 'Forum',
        isNavVisible: true
    },
    {
        id: ROUTE_TOPIC,
        path: '/forum/:topicId',
        component: TopicPage,
        isNavVisible: false
    },
    {
        id: ROUTE_PROFILE,
        exact: false,
        path: '/profile',
        component: ProfilePage,
        title: 'Profile',
        isNavVisible: true
    }
];
