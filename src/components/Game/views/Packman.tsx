import * as React from 'react';
import bem from 'easy-bem';
import './Packman.scss';

const b = bem('Packman');

export default class Packman extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                Packman
            </div>
        );
    }
}
