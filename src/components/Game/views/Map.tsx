import * as React from 'react';
import bem from 'easy-bem';
import './Map.scss';

const b = bem('Map');

export default class Map extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                Map
            </div>
        );
    }
}
