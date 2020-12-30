import IndexPage from './IndexPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignPage';
import ForumPage from './ForumPage';
import TopicPage from './TopicPage';

const ROUTE_ROOT = 'root';
const ROUTE_LOGIN = 'login';
const ROUTE_SIGNUP = 'sign up';
const ROUTE_FORUM = 'forum';
const ROUTE_TOPIC = 'topic';

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
    }
];
