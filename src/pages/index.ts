import LoginPage from './LoginPage';
import GamePage from './GamePage';
import ForumPage from './ForumPage';
import TopicPage from './TopicPage';
import SignUpPage from './SignUpPage';
import StartPage from './StartPage';
import ProfilePage from './ProfilePage';
import LeaderboardPage from './LeaderboardPage';
import FeedbackPage from './FeedbackPage';

const ROUTE_ROOT = 'root';
const ROUTE_LOGIN = 'login';
const ROUTE_SIGNUP = 'signup';
const ROUTE_PROFILE = 'profile';
const ROUTE_FORUM = 'forum';
const ROUTE_TOPIC = 'topic';
const ROUTE_GAME = 'game';
const ROUTE_LEADERBOARD = 'leaderboard';
const ROUTE_FEEDBACK = 'feedback';

export default [
    {
        id: ROUTE_ROOT,
        exact: true,
        path: '/',
        component: StartPage,
        title: 'PACMAN',
        isNavVisible: true,
        isProtected: true
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
        id: ROUTE_PROFILE,
        exact: false,
        path: '/profile',
        component: ProfilePage,
        title: 'Profile',
        isNavVisible: true,
        isProtected: true
    },
    {
        id: ROUTE_LEADERBOARD,
        exact: false,
        path: '/leaderboard',
        component: LeaderboardPage,
        title: 'Leaderboard',
        isNavVisible: true,
        isProtected: true
    },
    {
        id: ROUTE_FEEDBACK,
        exact: true,
        path: '/feedback',
        component: FeedbackPage,
        title: 'Feedback',
        isNavVisible: true,
        isProtected: false
    }
];
