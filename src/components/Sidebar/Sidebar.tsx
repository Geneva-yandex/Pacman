import * as React from 'react';
import classnames from 'classnames';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps, withRouter} from 'react-router';
import bem from 'easy-bem';
import './Sidebar.scss';
import AuthApi from '../../api/AuthApi';

const b = bem('Sidebar');

interface ISidebarProps {
    className?: string;
}

class Sidebar extends React.PureComponent<RouteComponentProps & ISidebarProps> {
    render() {
        return (
            <aside className={classnames(this.props.className, b())}>
                <nav className={b('navigation')}>
                    <ul className={b('nav-list')}>
                        <li>
                            <NavLink activeClassName="active" exact={true} className="icon-link" to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Game Controller</title>
                                    <path
                                        d="M467.51 248.83c-18.4-83.18-45.69-136.24-89.43-149.17A91.5 91.5 0 00352 96c-26.89 0-48.11 16-96 16s-69.15-16-96-16a99.09 99.09 0 00-27.2 3.66C89 112.59 61.94 165.7 43.33 248.83c-19 84.91-15.56 152 21.58 164.88 26 9 49.25-9.61 71.27-37 25-31.2 55.79-40.8 119.82-40.8s93.62 9.6 118.66 40.8c22 27.41 46.11 45.79 71.42 37.16 41.02-14.01 40.44-79.13 21.43-165.04z"
                                        fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                                    <circle cx="292" cy="224" r="20"/>
                                    <path d="M336 288a20 20 0 1120-19.95A20 20 0 01336 288z"/>
                                    <circle cx="336" cy="180" r="20"/>
                                    <circle cx="380" cy="224" r="20"/>
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 176v96M208 224h-96"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" className="icon-link" to="leaderboard">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Ribbon</title>
                                    <circle cx="256" cy="160" r="128" fill="none" stroke="currentColor"
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                                    <path d="M143.65 227.82L48 400l86.86-.42a16 16 0 0113.82 7.8L192 480l88.33-194.32"
                                        fill="none" stroke="currentColor" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="32"/>
                                    <path d="M366.54 224L464 400l-86.86-.42a16 16 0 00-13.82 7.8L320 480l-64-140.8"
                                        fill="none" stroke="currentColor" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="32"/>
                                    <circle cx="256" cy="160" r="64" fill="none" stroke="currentColor"
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" className="icon-link" to="profile">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Person</title>
                                    <path
                                        d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="32"/>
                                    <path
                                        d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                                        fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                                </svg>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className={b('actions')}>
                    <button className="icon-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <title>Settings</title>
                            <path
                                d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="32"/>
                        </svg>
                    </button>

                    <button className="icon-button" onClick={this._signout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                            <title>Exit</title>
                            <path
                                d="M320 176v-40a40 40 0 00-40-40H88a40 40 0 00-40 40v240a40 40 0 0040 40h192a40 40 0 0040-40v-40M384 176l80 80-80 80M191 256h273"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="32"/>
                        </svg>
                    </button>
                </div>
            </aside>
        );
    }

    private _signout = async () => {
        try {
            const response = await AuthApi.logOut();

            if (response.status === 200) {
                localStorage.removeItem('user');
                this.props.history.push('/login');
            }
        } catch (error) {
            this.setState({
                errorMessage: error.response.data.reason
            });
        }
    };
}

export default withRouter(Sidebar);
