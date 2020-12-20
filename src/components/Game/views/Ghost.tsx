import * as React from 'react';
import bem from 'easy-bem';
import './Ghost.scss';

const b = bem('Ghost');

export default class Ghost extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
               Ghost
            </div>
        );
    }
}
