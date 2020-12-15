import * as React from 'react';
import bem from 'easy-bem';
import './IndexPage.scss';

const b = bem('IndexPage');
export default class IndexPage extends React.PureComponent {
    render() {
        return (
            <div className={b()}>
                <div className={'container-fluid'}>
                    Index Page
                </div>
            </div>
        )
    }
}