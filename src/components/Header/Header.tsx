import * as React from 'react';
import bem from 'easy-bem';
import {Link} from 'react-router-dom';
import routes from '../../pages/index';
import {RouteType} from '../Router/types';
import './Header.scss';

const b = bem('Header');
export default class Header extends React.PureComponent {
    render() {
        return (
            <header className={b()}>
                <nav className={'container-fluid'}>
                    <ul className={b('nav-list')}>
                        {routes
                            .filter(route => route.isNavVisible)
                            .map(route => this.renderNavItem(route))
                        }
                    </ul>
                </nav>
            </header>
        )
    }

    renderNavItem(route: RouteType) {
        return (
            <li
                key={route.id}
                className={b('nav-item', {
                    [route.id]: true
                })}
            >
                <Link to={route.path}>
                    {route.title}
                </Link>
            </li>
        )
    }
}