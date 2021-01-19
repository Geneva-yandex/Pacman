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
                            <NavLink activeClassName="active" className="icon-link" to="forum">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                        strokeWidth="32"/>
                                    <path
                                        d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                        strokeWidth="32"/>
                                </svg>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className={b('actions')}>
                    <ul className={b('nav-list')}>
                        <li>
                            <NavLink activeClassName="active" className="icon-link" to="profile">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
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
                        <li>
                            <button className="icon-button" onClick={this._signout}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                                    <title>Exit</title>
                                    <path
                                        d="M320 176v-40a40 40 0 00-40-40H88a40 40 0 00-40 40v240a40 40 0 0040 40h192a40 40 0 0040-40v-40M384 176l80 80-80 80M191 256h273"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="32"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
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
